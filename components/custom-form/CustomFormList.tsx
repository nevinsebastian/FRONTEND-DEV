// /components/custom-form/CustomFormList.tsx
import React from "react";

const availableForms = [
  { id: 1, name: "Contact Form" },
  { id: 2, name: "Feedback Form" },
  { id: 3, name: "Survey Form" },
];

const CustomFormList = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold w-full b-10">Available Forms</h2>
      <ul className="space-y-2">
        {availableForms.map((form) => (
          <li key={form.id} className="bg-gray-100 p-4 rounded-md shadow-md">
            {form.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomFormList;
