"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { fetchFormFields } from "../api/api";

interface Field {
  name: string;
  field_type: string;
  is_required: boolean;
  filled_by: string;
  order: number;
  id: number;
}

const FormPage = () => {
  const pathname = usePathname();
  const formInstanceId = pathname?.split("/").pop(); // Extract form_instance_id from URL

  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!formInstanceId) return;
    const loadFields = async () => {
      try {
        const data = await fetchFormFields(Number(formInstanceId));
        setFields(data);
      } catch (err) {
        setError("Failed to fetch form fields.");
      } finally {
        setLoading(false);
      }
    };
    loadFields();
  }, [formInstanceId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">Customer Form</h1>
      <form>
        {fields.map((field) => (
          <div key={field.id} className="mb-4">
            <label className="block mb-1 font-medium">
              {field.name}{" "}
              {field.is_required && <span className="text-red-500">*</span>}
            </label>
            {field.field_type === "text" && (
              <input
                type="text"
                name={field.name}
                required={field.is_required}
                className="border p-2 w-full rounded"
              />
            )}
            {field.field_type === "image" && (
              <input
                type="file"
                accept="image/*"
                name={field.name}
                required={field.is_required}
                className="border p-2 w-full rounded"
              />
            )}
            {field.field_type === "date" && (
              <input
                type="date"
                name={field.name}
                required={field.is_required}
                className="border p-2 w-full rounded"
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
    </div>
  );
};

export default FormPage;
