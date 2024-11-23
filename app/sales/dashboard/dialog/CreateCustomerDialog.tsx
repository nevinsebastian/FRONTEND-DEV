"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconSquarePlus } from "@tabler/icons-react"; // You can use any other icon if needed

const CreateCustomerDialog = ({
  onSubmit,
}: {
  onSubmit: (customerName: string) => void;
}) => {
  // State for customer name
  const [customerName, setCustomerName] = useState("");

  // Handle form submission
  const handleSubmit = () => {
    // Logic to handle customer name submission (e.g., passing it to parent component or API)
    if (customerName.trim()) {
      onSubmit(customerName); // Pass the customer name to parent or API
      setCustomerName(""); // Clear the input
    }
  };

  return (
    <Dialog>
      {/* Dialog Trigger */}
      <DialogTrigger asChild>
        <IconSquarePlus className="text-neutral-700 dark:text-neutral-200 h-7 w-7 cursor-pointer transition-transform hover:scale-105" />
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent
        className="
          max-w-[600px] 
          p-8 
          bg-white 
          dark:bg-neutral-900 
          rounded-xl 
          shadow-2xl 
          transition-all 
          border 
          border-neutral-200 
          dark:border-neutral-700 
          backdrop-blur-lg
        "
      >
        {/* Dialog Header */}
        <DialogHeader>
          <DialogTitle className="text-3xl font-semibold text-neutral-800 dark:text-neutral-100">
            Create New Customer
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
            Enter the name of the new customer
          </DialogDescription>
        </DialogHeader>

        {/* Form Inputs */}
        <div className="space-y-4">
          {/* Customer Name Input */}
          <div>
            <Label htmlFor="customerName" className="text-sm">
              Customer Name
            </Label>
            <Input
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter customer's name"
            />
          </div>
        </div>

        {/* Dialog Footer */}
        <DialogFooter className="flex justify-end gap-4">
          <Button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Submit
          </Button>
          <Button
            variant="secondary"
            className="dark:bg-neutral-700 dark:text-neutral-200"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCustomerDialog;
