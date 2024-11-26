"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { fetchFormFields, fetchSalesData } from "../api/api";

interface Field {
  name: string;
  field_type: string;
  is_required: boolean;
  filled_by: string;
  order: number;
  id: number;
}

interface SalesResponse {
  field_name: string;
  value: string;
}

const FormPage = () => {
  const pathname = usePathname();
  const formInstanceId = pathname?.split("/").pop(); // Extract form_instance_id from URL

  const [fields, setFields] = useState<Field[]>([]);
  const [salesData, setSalesData] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Deduplicate fields by name
  const deduplicateFields = (fields: Field[]): Field[] => {
    const uniqueFields: Record<string, Field> = {};
    fields.forEach((field) => {
      if (!uniqueFields[field.name]) {
        uniqueFields[field.name] = field;
      }
    });
    return Object.values(uniqueFields);
  };

  useEffect(() => {
    if (!formInstanceId) return;

    const loadData = async () => {
      try {
        // Fetch form fields
        const formFields = await fetchFormFields(Number(formInstanceId));
        const uniqueFields = deduplicateFields(formFields);
        setFields(uniqueFields);

        // Fetch sales data
        const salesResponse = await fetchSalesData(Number(formInstanceId));
        const salesDataMapped = salesResponse.responses.reduce(
          (acc: Record<string, string>, item: SalesResponse) => {
            acc[item.field_name] = item.value;
            return acc;
          },
          {}
        );
        setSalesData(salesDataMapped);

        // Initialize form data with sales data or empty strings
        const initialFormData = uniqueFields.reduce((acc, field) => {
          acc[field.name] = salesDataMapped[field.name] || "";
          return acc;
        }, {} as Record<string, string>);
        setFormData(initialFormData);
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [formInstanceId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">Customer Form</h1>
      <form>
        {fields.map((field) => {
          const isSalesField = salesData[field.name] !== undefined;
          const fieldValue = isSalesField
            ? salesData[field.name]
            : formData[field.name] || "";

          return (
            <div key={field.id} className="mb-4">
              <label className="block mb-1 font-medium">
                {field.name}{" "}
                {field.is_required && <span className="text-red-500">*</span>}
              </label>
              {field.field_type === "text" && (
                <input
                  type="text"
                  name={field.name}
                  value={isSalesField ? undefined : formData[field.name]} // Use undefined for sales fields
                  defaultValue={isSalesField ? fieldValue : undefined} // Use defaultValue for static fields
                  onChange={!isSalesField ? handleChange : undefined} // Attach onChange only for editable fields
                  required={field.is_required}
                  readOnly={isSalesField} // Explicitly set readOnly for sales fields
                  className={`border p-2 w-full rounded ${
                    isSalesField ? "bg-red-600 cursor-not-allowed" : ""
                  }`}
                />
              )}
              {field.field_type === "image" && (
                <input
                  type="file"
                  accept="image/*"
                  name={field.name}
                  disabled={isSalesField || field.filled_by !== "customer"}
                  className={`border p-2 w-full rounded ${
                    isSalesField || field.filled_by !== "customer"
                      ? "bg-gray-200 cursor-not-allowed"
                      : ""
                  }`}
                />
              )}
              {field.field_type === "date" && (
                <input
                  type="date"
                  name={field.name}
                  value={isSalesField ? undefined : formData[field.name]} // Use undefined for sales fields
                  defaultValue={isSalesField ? fieldValue : undefined} // Use defaultValue for static fields
                  onChange={!isSalesField ? handleChange : undefined} // Attach onChange only for editable fields
                  required={field.is_required}
                  readOnly={isSalesField} // Explicitly set readOnly for sales fields
                  className={`border p-2 w-full rounded ${
                    isSalesField ? "bg-gray-200 cursor-not-allowed" : ""
                  }`}
                />
              )}
            </div>
          );
        })}
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

export default FormPage;
