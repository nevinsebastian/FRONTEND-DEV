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
import { IconSquarePlus } from "@tabler/icons-react";

const Addbranch = () => {
  // State for input values
  const [branchName, setBranchName] = useState("");
  const [location, setLocation] = useState(""); // Location input

  // Handle form submission
  const handleSubmit = () => {
    // Logic to handle adding the branch
    console.log("Branch Name:", branchName);
    console.log("Location:", location);

    // You can replace this with actual logic like API calls
    setBranchName("");
    setLocation("");
  };

  return (
    <Dialog>
      {/* Icon trigger button */}
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
            Add Branch
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
            Enter the details for the new branch
          </DialogDescription>
        </DialogHeader>

        {/* Form Inputs */}
        <div className="space-y-4">
          {/* Branch Name Input */}
          <div>
            <Label htmlFor="branchName" className="text-sm">
              Branch Name
            </Label>
            <Input
              id="branchName"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              placeholder="Enter branch name"
            />
          </div>

          {/* Location Input */}
          <div>
            <Label htmlFor="location" className="text-sm">
              Location
            </Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter branch location"
            />
          </div>
        </div>

        {/* Dialog Footer */}
        <DialogFooter className="flex justify-end gap-4">
          <Button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Save
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

export default Addbranch;
