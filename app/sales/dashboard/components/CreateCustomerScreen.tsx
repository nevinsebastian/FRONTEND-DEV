import React, { useEffect, useState } from "react";

interface FormField {
  name: string;
  field_type: string;
  is_required: boolean;
  filled_by: string;
  order: number;
  id: number;
}

const CreateCustomerScreen = () => {
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFormFields = async () => {
      setLoading(true);
      setError("");

      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem("auth_token");

        if (!token) {
          throw new Error("No token found. Please log in again.");
        }

        const response = await fetch(
          "http://3.111.52.81:8000/form-builder/forms/active",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized. Please log in again.");
          }
          throw new Error(`Error: ${response.statusText}`);
        }

        const data: FormField[] = await response.json();
        setFormFields(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch form fields");
      } finally {
        setLoading(false);
      }
    };

    fetchFormFields();
  }, []);

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Handle form submission logic here
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1>Create Customer</h1>
      <form onSubmit={handleSubmit}>
        {formFields.map((field) => (
          <div key={field.id} className="mb-4">
            <label
              htmlFor={field.name}
              className="block text-gray-700 font-medium"
            >
              {field.name} {field.is_required && "*"}
            </label>
            <input
              type={field.field_type}
              id={field.name}
              name={field.name}
              required={field.is_required}
              className="border p-2 w-full rounded"
              onChange={(e) => handleInputChange(field.name, e.target.value)}
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateCustomerScreen;
