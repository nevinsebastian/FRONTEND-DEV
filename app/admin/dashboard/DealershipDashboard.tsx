"use client";

import React from "react";
import { Component } from "@/components/charts/SalesChart";
import { Feedbacks } from "@/components/charts/feedback";
import ComboboxPopover from "./ComboboxPopover";
import Addbranch from "@/components/dialogus/AddBranch";

const DealershipDashboard = () => {
  return (
    <div className="relative h-screen overflow-hidden bg-white dark:bg-neutral-900">
      {/* Parent container with flex to align ComboboxPopover and Addbranch horizontally */}
      <div className="flex items-center space-x-4 z-50 absolute top-4 right-4">
        <ComboboxPopover />
        <div className="cursor-pointer">
          <Addbranch />
        </div>
      </div>

      <div className="h-full no-scrollbar overflow-y-auto p-6 md:p-12 border-t border-neutral-200 dark:border-neutral-700">
        <h1 className="text-2xl font-bold mb-4">Dealership Dashboard</h1>

        {/* Sales Chart Component */}
        <div className="mb-8">
          <Component />
        </div>

        {/* Feedbacks Component */}
        <div className="mb-8">
          <Feedbacks />
        </div>

        {/* Dashboard Cards */}
        <div className="flex gap-6">
          {[...new Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-32 w-full rounded-lg bg-gray-100 dark:bg-neutral-800"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DealershipDashboard;
