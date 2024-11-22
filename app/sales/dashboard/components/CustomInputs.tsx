"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileUpload } from "@/components/ui/file-upload";
import { DatePickerDemo } from "@/components/ui/date-picker-demo";

// Define types for field and onChange handler
interface Field {
  id: string;
  name: string;
  field_type: string;
  is_required: boolean;
}

interface InputProps {
  field: Field;
  value?: string | number | Date | File[]; // Value type depends on input type
  onChange: (name: string, value: any) => void; // Callback for updating value
}

// Text Input Component
export const TextInput: React.FC<InputProps> = ({ field, value, onChange }) => (
  <div className="grid w-full max-w-sm items-center gap-1.5">
    <Label htmlFor={field.name}>
      {field.name} {field.is_required && "*"}
    </Label>
    <Input
      id={field.name}
      type="text"
      value={value as string}
      onChange={(e) => onChange(field.name, e.target.value)}
      placeholder={`Enter ${field.name}`}
      required={field.is_required}
    />
  </div>
);

// Number Input Component
export const NumberInput: React.FC<InputProps> = ({
  field,
  value,
  onChange,
}) => (
  <div className="grid w-full max-w-sm items-center gap-1.5">
    <Label htmlFor={field.name}>
      {field.name} {field.is_required && "*"}
    </Label>
    <Input
      id={field.name}
      type="number"
      value={value as string}
      onChange={(e) => onChange(field.name, e.target.value)}
      placeholder={`Enter ${field.name}`}
      required={field.is_required}
    />
  </div>
);

// Date Picker Component
export const DateInput: React.FC<InputProps> = ({ field, value, onChange }) => (
  <div className="grid w-full max-w-sm items-center gap-1.5">
    <Label>
      {field.name} {field.is_required && "*"}
    </Label>
    <DatePickerDemo
      selected={value as Date | undefined}
      onSelect={(date: Date | undefined) => onChange(field.name, date)}
    />
  </div>
);

// File Upload Component
export const FileInput: React.FC<InputProps> = ({ field, onChange }) => (
  <div className="grid w-full max-w-sm items-center gap-1.5">
    <Label>
      {field.name} {field.is_required && "*"}
    </Label>
    <FileUpload
      accept="image/*"
      onChange={(files: File[]) => onChange(field.name, files)}
    />
  </div>
);
