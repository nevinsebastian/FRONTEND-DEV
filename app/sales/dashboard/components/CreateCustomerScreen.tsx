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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [formInstanceId, setFormInstanceId] = useState<number | null>(null);

  const fetchFormFields = async () => {
    setLoading(true);
    setError("");

    try {
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

  const handleCreateFormInstance = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("auth_token");

      if (!token) {
        throw new Error("No token found. Please log in again.");
      }

      const response = await fetch(
        `http://3.111.52.81:8000/form-builder/forms/create?customer_name=${encodeURIComponent(
          name
        )}&customer_email=${encodeURIComponent(email)}`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.form_instance_id) {
        setFormInstanceId(data.form_instance_id);
        localStorage.setItem("form_instance_id", data.form_instance_id); // Optional: Store in localStorage
        await fetchFormFields();
      }
    } catch (err: any) {
      setError(err.message || "Failed to create form instance");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleFileChange = (fieldName: string, file: File) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: file,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      formDataToSubmit.append(
        key,
        value instanceof File ? value : JSON.stringify(value)
      );
    }

    console.log("Form Data to Submit:", formDataToSubmit);
    // Perform API submission with `formDataToSubmit`
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1>Create Customer</h1>

      {!formInstanceId ? (
        // Email and Name Input Section
        <div className="mb-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Customer Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Customer Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <button
            onClick={handleCreateFormInstance}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Create Form Instance
          </button>
        </div>
      ) : (
        // Render Custom Form Fields
        <form onSubmit={handleSubmit}>
          {formFields.map((field) => (
            <div key={field.id} className="mb-4">
              <label
                htmlFor={field.name}
                className="block text-gray-700 font-medium"
              >
                {field.name} {field.is_required && "*"}
              </label>

              {field.filled_by === "sales_executive" ? (
                // Editable fields
                field.field_type === "image" ? (
                  <input
                    type="file"
                    id={field.name}
                    name={field.name}
                    required={field.is_required}
                    accept="image/*"
                    className="border p-2 w-full rounded"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileChange(field.name, e.target.files[0]);
                      }
                    }}
                  />
                ) : (
                  <input
                    type={field.field_type}
                    id={field.name}
                    name={field.name}
                    required={field.is_required}
                    className="border p-2 w-full rounded"
                    onChange={(e) =>
                      handleInputChange(field.name, e.target.value)
                    }
                  />
                )
              ) : (
                // Non-editable fields
                <input
                  type={
                    field.field_type === "image" ? "text" : field.field_type
                  }
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ""}
                  placeholder="To be filled by customer"
                  disabled
                  className="border p-2 w-full rounded text-gray-500"
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateCustomerScreen;
