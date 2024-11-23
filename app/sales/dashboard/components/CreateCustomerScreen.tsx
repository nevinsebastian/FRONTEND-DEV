import React, { useState, useEffect } from "react";

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
  const [customerName, setCustomerName] = useState("");
  const [formInstanceId, setFormInstanceId] = useState<number | null>(null);
  const [nameSubmitted, setNameSubmitted] = useState(false);

  // Fetch form fields after getting form_instance_id
  useEffect(() => {
    const fetchFormFields = async () => {
      if (formInstanceId) {
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
            throw new Error("Failed to fetch form fields");
          }

          const data: FormField[] = await response.json();
          setFormFields(data); // Set fetched form fields
        } catch (err: any) {
          setError(err.message || "Failed to fetch form fields");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchFormFields();
  }, [formInstanceId]);

  // Handle customer name submission to get form instance ID
  const handleCustomerNameSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("auth_token");

      if (!token) {
        throw new Error("No token found. Please log in again.");
      }

      const response = await fetch(
        `http://3.111.52.81:8000/form-builder/forms/create?customer_name=${customerName}`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create form instance");
      }

      const data = await response.json();
      const instanceId = data.form_instance_id;
      setFormInstanceId(instanceId); // Save form_instance_id
      localStorage.setItem("form_instance_id", String(instanceId)); // Save instanceId in localStorage
      console.log("Form Instance ID:", instanceId); // Log instance ID to console
      setNameSubmitted(true); // After successful submission, show the form fields
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

  return (
    <div className="p-4">
      <h1>Create Customer</h1>
      {!nameSubmitted ? (
        // Show customer name input first
        <div>
          <label
            htmlFor="customerName"
            className="block text-gray-700 font-medium"
          >
            Customer Name
          </label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            className="border p-2 w-full rounded"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={handleCustomerNameSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Submit Name
          </button>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
      ) : (
        // After form instance is created, show dynamic form fields
        <form onSubmit={handleSubmit}>
          <h2>Customer Form</h2>
          {formFields.length > 0 ? (
            formFields.map((field) => (
              <div key={field.id} className="mb-4">
                <label
                  htmlFor={field.name}
                  className="block text-gray-700 font-medium"
                >
                  {field.name} {field.is_required && "*"}
                </label>

                {field.filled_by === "sales_executive" ? (
                  // Editable fields (image or text input)
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
            ))
          ) : (
            <div>Loading form fields...</div>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateCustomerScreen;
