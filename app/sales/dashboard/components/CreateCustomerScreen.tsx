import React, { useState, useEffect } from "react";
import {
  createFormInstance,
  fetchFormFields,
  submitFormData,
  fetchVehicles,
} from "../api/apiService";

interface FormField {
  name: string;
  field_type: string;
  is_required: boolean;
  filled_by: string;
  order: number;
  id: number;
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

const CreateCustomerScreen = () => {
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [formInstanceId, setFormInstanceId] = useState<number | null>(null);
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [formLink, setFormLink] = useState<string | null>(null); // To hold the generated form link

  // New state for vehicles and selected vehicle
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  // Fetch vehicles when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("auth_token"); // Fetch auth token from localStorage
    if (token) {
      setLoading(true);
      fetchVehicles(token)
        .then((data) => setVehicles(data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, []);

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
      // Generate the link with the form instance ID
      const generatedLink = `http://localhost:3000/customer/${instanceId}`;
      setFormLink(generatedLink); // Store the generated link
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formInstanceId) {
      setError("Form instance ID is missing. Please try again.");
      return;
    }

    const formDataToSubmit: Record<string, any> = {};
    for (const [key, value] of Object.entries(formData)) {
      // Ensure files are converted to base64 if required by the API
      if (value instanceof File) {
        const base64 = await fileToBase64(value);
        formDataToSubmit[key] = base64;
      } else {
        formDataToSubmit[key] = value;
      }
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");
    try {
      // Submit form data and get the form_instance_id from the response
      const formInstanceIdFromApi = await submitFormData(
        formInstanceId,
        formDataToSubmit
      );

      // Optionally store the form_instance_id in localStorage or state
      localStorage.setItem("form_instance_id", String(formInstanceIdFromApi));

      setSuccessMessage("Form submitted successfully!");
      console.log("Form instance ID from API response:", formInstanceIdFromApi);

      // Generate the link with the form instance ID after submission
      const generatedLink = `http://localhost:3000/customer/${formInstanceIdFromApi}`;
      setFormLink(generatedLink); // Store the generated link
    } catch (err: any) {
      setError(err.message || "Failed to submit the form");
    } finally {
      setLoading(false);
    }
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

          {/* Dropdown for Vehicle Selection */}
          <div className="mb-4">
            <label
              htmlFor="vehicle"
              className="block text-gray-700 font-medium"
            >
              Vehicle
            </label>
            <select
              id="vehicle"
              name="vehicle"
              className="border p-2 w-full rounded"
              value={selectedVehicle || ""}
              onChange={(e) => setSelectedVehicle(e.target.value)}
            >
              <option value="">Select Vehicle</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.name}
                </option>
              ))}
            </select>
            {error && <div className="text-red-500 mt-2">{error}</div>}
          </div>

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
          {successMessage && (
            <div className="text-green-500 mt-2">{successMessage}</div>
          )}
        </form>
      )}

      {/* Display the generated link */}
      {formLink && (
        <div className="mt-4">
          <h3>Customer Form Link</h3>
          <a href={formLink} target="_blank" rel="noopener noreferrer">
            {formLink}
          </a>
        </div>
      )}
    </div>
  );
};

export default CreateCustomerScreen;
