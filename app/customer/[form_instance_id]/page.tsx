// app/customer/[form_instance_id]/page.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchFormFields, submitFormData } from "../../../apiService"; // Import your API functions

interface FormField {
  name: string;
  label: string;
  type: string;
}

const CustomerForm = () => {
  const router = useRouter();
  const { form_instance_id } = router.query; // Get the form instance ID from URL
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (form_instance_id) {
      fetchFormFields(Number(form_instance_id))
        .then((fields) => {
          setFormFields(fields);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [form_instance_id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await submitFormData(Number(form_instance_id), formData);
      console.log("Form submitted successfully", result);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Customer Details</h1>
      {formFields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleInputChange}
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default CustomerForm;
