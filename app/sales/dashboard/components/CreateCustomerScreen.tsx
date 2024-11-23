// CreateCustomerScreen.tsx

import React, { useState, useEffect } from "react";
import { createFormInstance, fetchFormFields } from "../api/apiService";

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

  useEffect(() => {
    const fetchFormData = async () => {
      if (formInstanceId) {
        setLoading(true);
        try {
          const fields = await fetchFormFields(formInstanceId);
          setFormFields(fields);
        } catch (err) {
          setError("Failed to fetch form fields");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchFormData();
  }, [formInstanceId]);

  const handleCustomerNameSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const instanceId = await createFormInstance(customerName);
      setFormInstanceId(instanceId);
      localStorage.setItem("form_instance_id", String(instanceId));
      console.log("Form Instance ID:", instanceId);
      setNameSubmitted(true);
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
