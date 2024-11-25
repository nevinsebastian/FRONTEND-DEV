"use client";

import { Tabs } from "@/components/ui/tabs";
import { CustomFormList, CreateForm } from "@/components/custom-form"; // Import the components
import { TableDemo } from "./components/table";
import { Button } from "@/components/ui/button";
import { AddVehicle } from "./dialog/addVehicle";
export function TabsDemo() {
  const tabs = [
    {
      title: "Custom Form",
      value: "form",
      content: (
        <div className="w-full h-full overflow-auto relative rounded-2xl p-10 text-3xl md:text-3xl font-semibold text-gray-900 bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-600">
          <div className="flex flex-col gap-10">
            <CustomFormList /> {/* List available forms */}
            <CreateForm /> {/* Form to create a new form */}
          </div>
        </div>
      ),
    },
    {
      title: "Services",
      value: "services",
      content: (
        <div className="w-full h-full overflow-auto relative rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900"></div>
      ),
    },
    {
      title: "Vehicle",
      value: "Vehicle",
      content: (
        <div className="w-full h-full overflow-auto relative rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <div className="flex items-center justify-between mb-4">
            <p>Vehicle List</p>
            <AddVehicle />
          </div>
          <TableDemo />
        </div>
      ),
    },
    {
      title: "Content",
      value: "content",
      content: (
        <div className="w-full h-full overflow-auto relative rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Content tab</p>
        </div>
      ),
    },
    {
      title: "Random",
      value: "random",
      content: (
        <div className="w-full h-full overflow-auto relative rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Random tab</p>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col w-4/5 h-3/4 items-center justify-start my-10 text-xl">
      {/* Title centered with larger size */}

      {/* Tabs component */}
      <Tabs tabs={tabs} />
    </div>
  );
}
