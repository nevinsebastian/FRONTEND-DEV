import React from "react";

const DealershipDashboard = () => {
  return (
    <div className="p-6 md:p-12 bg-white dark:bg-neutral-900 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700">
      <h1 className="text-2xl font-bold mb-4">Dealership Dashboard</h1>
      <button className="bg-blue-500 text-white p-2 rounded-md">Branch</button>
      <div className="flex gap-6 mt-6">
        {[...new Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-32 w-full rounded-lg bg-gray-100 dark:bg-neutral-800"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default DealershipDashboard;
