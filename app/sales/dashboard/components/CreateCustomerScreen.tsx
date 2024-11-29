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
  const [vehicleTotalPrice, setVehicleTotalPrice] = useState<number>(0); // Store selected vehicle's total price
  const [totalAmount, setTotalAmount] = useState<number>(0); // Store the sum of 'amount' fields (like tax, etc.)

  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
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

  const handleVehicleSelect = (vehicleName: string, totalPrice: number) => {
    setFormData((prevData) => {
      const updatedData = { ...prevData, totalPrice };
      formFields.forEach((field) => {
        if (field.field_type === "vehicle") {
          updatedData[field.name] = vehicleName; // Store the vehicle name instead of ID
        }
      });
      return updatedData;
    });
    localStorage.setItem(
      "selected_vehicle",
      JSON.stringify({ vehicleName, totalPrice })
    );
    setVehicleTotalPrice(totalPrice); // Update the selected vehicle price
  };

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData((prevData) => {
      const updatedData = { ...prevData, [fieldName]: value };

      // Recalculate the total amount when an amount field changes
      let newTotalAmount = totalAmount;

      // Check if the field is an 'amount' field and update totalAmount
      if (fieldName === "tax") {
        const amountValue = parseFloat(value) || 0; // Ensure it's a number, defaulting to 0 if NaN
        newTotalAmount = amountValue; // Update with the new value for the tax field
      }

      setTotalAmount(newTotalAmount); // Update the total amount state
      return updatedData;
    });
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
      setSuccessMessage("Form submitted successfully!");
      const generatedLink = `http://localhost:3000/customer/${formInstanceIdFromApi}`;
      setFormLink(generatedLink);
    } catch (err: any) {
      setError(err.message || "Failed to submit the form");
    } finally {
      setLoading(false);
    }
  };

  const handleCalculateTotal = () => {
    // Calculate the total price: vehicleTotalPrice + sum of all "amount" fields (like tax)
    const total = vehicleTotalPrice + totalAmount;
    alert(`Total Price: ${total}`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Create Customer</h1>
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
            className="border p-2 w-full rounded"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
          <button
            onClick={handleCustomerNameSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Submit Name
          </button>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold mb-2">Customer Form</h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">
              Select Vehicle
            </label>
            <VehicleDropdown token={token} onSelect={handleVehicleSelect} />
          </div>

          {formFields.map((field) => (
            <div key={field.id} className="mb-4">
              <label
                htmlFor={field.name}
                className="block text-gray-700 font-medium"
              >
                {field.name} {field.is_required && "*"}
              </label>
              <input
                type={
                  field.field_type === "vehicle" ? "text" : field.field_type
                }
                id={field.name}
                name={field.name}
                required={field.is_required}
                className="border p-2 w-full rounded"
                value={formData[field.name] || ""}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                disabled={field.filled_by !== "sales_executive"}
              />
            </div>
          ))}

          {/* Display total price */}
          <div className="mt-4">
            <strong>Vehicle ex-showroom Price:</strong> {vehicleTotalPrice}
          </div>

          <div className="mt-4">
            <strong>Sum of Amount Fields (Tax, etc.):</strong>{" "}
            {totalAmount + vehicleTotalPrice}
          </div>

          <button
            type="button"
            onClick={handleCalculateTotal}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Calculate Total
          </button>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Submit
          </button>
          {successMessage && (
            <div className="text-green-500 mt-4">{successMessage}</div>
          )}
          {error && <div className="text-red-500 mt-4">{error}</div>}
        </form>
      )}
    </div>
  );
};

export default CreateCustomerScreen;
