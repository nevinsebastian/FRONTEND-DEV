import React, { useState, useEffect } from "react";
import {
  createFormInstance,
  fetchFormFields,
  submitFormData,
} from "../api/apiService";
import VehicleDropdown from "./dropDown/VehicleDropdown";

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
  const [formLink, setFormLink] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
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
      setNameSubmitted(true);
      const generatedLink = `http://localhost:3000/customer/${instanceId}`;
      setFormLink(generatedLink);
    } catch (err: any) {
      setError(err.message || "Failed to create form instance");
    } finally {
      setLoading(false);
    }
  };

  const handleVehicleSelect = (vehicleId: string, totalPrice: number) => {
    setSelectedVehicle(vehicleId);
    setTotalPrice(totalPrice);
    handleInputChange("totalPrice", totalPrice);
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
      const formInstanceIdFromApi = await submitFormData(
        formInstanceId,
        formDataToSubmit
      );
      localStorage.setItem("form_instance_id", String(formInstanceIdFromApi));
      setSuccessMessage("Form submitted successfully!");
      const generatedLink = `http://localhost:3000/customer/${formInstanceIdFromApi}`;
      setFormLink(generatedLink);
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

          {/* VehicleDropdown component */}
          <div className="mb-4">
            <label
              htmlFor="vehicle"
              className="block text-gray-700 font-medium"
            >
              Select Vehicle
            </label>
            <VehicleDropdown token={token} onSelect={handleVehicleSelect} />
          </div>

          {/* Existing form fields */}
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
                ) : (
                  <input
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ""}
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
