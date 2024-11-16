"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Component } from "@/components/charts/SalesChart";
import { Feedbacks } from "@/components/charts/feedback";

type Status = {
  value: string;
  label: string;
};

const statuses: Status[] = [
  { value: "Alappuzha", label: "Alappuzha" },
  { value: "Kollam", label: "Kollam" },
  { value: "Ambalappuzha", label: "Ambalapuzha" },
  { value: "Muhamma", label: "Muhamma" },
];

// ComboboxPopover component
export function ComboboxPopover() {
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    null
  );

  return (
    <div className="fixed top-4 right-4 flex items-center space-x-4 z-50">
      <p className="text-sm text-muted-foreground">Branch</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {selectedStatus ? <>{selectedStatus.label}</> : <>Alappuzha</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="bottom" align="start">
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={(value) => {
                      setSelectedStatus(
                        statuses.find((status) => status.value === value) ||
                          null
                      );
                      setOpen(false);
                    }}
                  >
                    {status.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

const DealershipDashboard = () => {
  return (
    <div className="relative h-screen overflow-hidden bg-white dark:bg-neutral-900">
      {/* Adding the ComboboxPopover at the top-right corner */}
      <ComboboxPopover />

      {/* Scrollable content */}
      <div className="h-full overflow-y-auto p-6 md:p-12 border-t border-neutral-200 dark:border-neutral-700">
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
