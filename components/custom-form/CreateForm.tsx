// /components/custom-form/CreateForm.tsx
import React, { useState } from "react";

const CreateForm = () => {
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form creation logic (e.g., save form)
    alert(`Form created: ${formName}`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Create New Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-lg font-medium" htmlFor="formName">
            Form Name
          </label>
          <input
            id="formName"
            type="text"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            className="p-2 border rounded-md"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-medium" htmlFor="formDescription">
            Form Description
          </label>
          <textarea
            id="formDescription"
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            className="p-2 border rounded-md"
            rows={4}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-md mt-4"
        >
          Create Form
        </button>
      </form>
    </div>
  );
};

export default CreateForm;
