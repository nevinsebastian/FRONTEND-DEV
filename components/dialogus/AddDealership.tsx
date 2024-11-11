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
import { IconSquarePlus } from "@tabler/icons-react";

const AddDealership = () => {
  const [name, setName] = useState("Pedro Duarte");
  const [username, setUsername] = useState("@peduarte");

  return (
    <Dialog>
      {/* Icon trigger button */}
      <DialogTrigger asChild>
        <IconSquarePlus className="text-neutral-700 dark:text-neutral-200 h-7 w-7 cursor-pointer transition-transform hover:scale-105" />
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent
        className={`
          max-w-[500px] 
          p-6 
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
            Edit Profile
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        {/* Form Inputs */}
        <div className="grid gap-6 py-4">
          {/* Name Input */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="name"
              className="text-right font-medium text-neutral-700 dark:text-neutral-300"
            >
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3 p-3 text-lg border rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-neutral-800 dark:border-neutral-600 dark:focus:border-blue-500"
              placeholder="Enter your name"
            />
          </div>

          {/* Username Input */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="username"
              className="text-right font-medium text-neutral-700 dark:text-neutral-300"
            >
              Username
            </Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="col-span-3 p-3 text-lg border rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-neutral-800 dark:border-neutral-600 dark:focus:border-blue-500"
              placeholder="Enter your username"
            />
          </div>
        </div>

        {/* Dialog Footer */}
        <DialogFooter className="flex justify-end gap-4">
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Save changes
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
