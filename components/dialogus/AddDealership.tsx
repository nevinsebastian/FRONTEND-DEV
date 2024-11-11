// components/dialogs/EditProfileDialog.tsx

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
import { Checkbox } from "@/components/ui/checkbox";
import { IconSquarePlus } from "@tabler/icons-react";

const AddDealership = () => {
  const [dealershipName, setDealershipName] = useState("");
  const [branches, setBranches] = useState("");
  const [employees, setEmployees] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [roles, setRoles] = useState<{
    managers: boolean;
    sales: boolean;
    rto: boolean;
  }>({
    managers: false,
    sales: false,
    rto: false,
  });

  // Define role type explicitly
  const handleRoleChange = (role: "managers" | "sales" | "rto") => {
    setRoles((prev) => ({ ...prev, [role]: !prev[role] }));
  };
  
  return (
    <Dialog>
      {/* Icon trigger button */}
      <DialogTrigger asChild>
        <IconSquarePlus className="text-neutral-700 dark:text-neutral-200 h-7 w-7 cursor-pointer transition-transform hover:scale-105" />
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent
        className={`
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
        `}
      >
        {/* Dialog Header */}
        <DialogHeader>
          <DialogTitle className="text-3xl font-semibold text-neutral-800 dark:text-neutral-100">
            Add Dealership
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
            Create your dealership
          </DialogDescription>
        </DialogHeader>

        {/* Form Inputs */}
        <div className="grid gap-6 py-4">
          {/* Dealership Name */}
          <div className="grid grid-cols-3 items-center gap-4">
            <Label
              htmlFor="dealershipName"
              className="text-right font-medium text-neutral-700 dark:text-neutral-300"
            >
              Dealership Name
            </Label>
            <Input
              id="dealershipName"
              value={dealershipName}
              onChange={(e) => setDealershipName(e.target.value)}
              className="col-span-2 p-4 text-lg border rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-neutral-800 dark:border-neutral-600 dark:focus:border-blue-500"
              placeholder="Enter dealership name"
            />
          </div>

          {/* Number of Branches */}
          <div className="grid grid-cols-3 items-center gap-4">
            <Label
              htmlFor="branches"
              className="text-right font-medium text-neutral-700 dark:text-neutral-300"
            >
              Number of Branches
            </Label>
            <Input
              id="branches"
              type="number"
              value={branches}
              onChange={(e) => setBranches(e.target.value)}
              className="col-span-2 p-4 text-lg border rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-neutral-800 dark:border-neutral-600 dark:focus:border-blue-500"
              placeholder="Enter number of branches"
            />
          </div>

          {/* Number of Employees */}
          <div className="grid grid-cols-3 items-center gap-4">
            <Label
              htmlFor="employees"
              className="text-right font-medium text-neutral-700 dark:text-neutral-300"
            >
              Number of Employees
            </Label>
            <Input
              id="employees"
              type="number"
              value={employees}
              onChange={(e) => setEmployees(e.target.value)}
              className="col-span-2 p-4 text-lg border rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-neutral-800 dark:border-neutral-600 dark:focus:border-blue-500"
              placeholder="Enter number of employees"
            />
          </div>

          {/* Address (Head Office) */}
          <div className="grid grid-cols-3 items-center gap-4">
            <Label
              htmlFor="address"
              className="text-right font-medium text-neutral-700 dark:text-neutral-300"
            >
              Address
            </Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="col-span-2 p-4 text-lg border rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-neutral-800 dark:border-neutral-600 dark:focus:border-blue-500"
              placeholder="Enter head office address"
            />
          </div>

          {/* Roles Checkboxes */}
          <div className="grid grid-cols-3 items-center gap-4">
            <Label className="text-right font-medium text-neutral-700 dark:text-neutral-300">
              Roles
            </Label>
            <div className="col-span-2 flex gap-4">
              <div className="flex items-center">
                <Checkbox
                  checked={roles.managers}
                  onCheckedChange={() => handleRoleChange("managers")}
                />
                <span className="ml-2">Managers</span>
              </div>
              <div className="flex items-center">
                <Checkbox
                  checked={roles.sales}
                  onCheckedChange={() => handleRoleChange("sales")}
                />
                <span className="ml-2">Sales</span>
              </div>
              <div className="flex items-center">
                <Checkbox
                  checked={roles.rto}
                  onCheckedChange={() => handleRoleChange("rto")}
                />
                <span className="ml-2">RTO</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="grid grid-cols-3 items-center gap-4">
            <Label
              htmlFor="contact"
              className="text-right font-medium text-neutral-700 dark:text-neutral-300"
            >
              Contact
            </Label>
            <Input
              id="contact"
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="col-span-2 p-4 text-lg border rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-neutral-800 dark:border-neutral-600 dark:focus:border-blue-500"
              placeholder="Enter contact number"
            />
          </div>
        </div>

        {/* Dialog Footer */}
        <DialogFooter className="flex justify-end gap-4">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600">
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

export default AddDealership;
