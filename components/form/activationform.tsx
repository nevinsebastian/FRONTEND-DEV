"use client";

import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button"; // ShadCN Button
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"; // OTP components

export function ActivationForm() {
  const [showOtp, setShowOtp] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted", {
      email,
      currentPassword,
      newPassword,
      phoneNumber,
    });
    // Add API call for activation here
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black h-280 mt-10 opacity-100">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Activate Your Account
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Enter your details to activate your account.
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        {/* Email and OTP Button */}
        <div className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="example@domain.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </LabelInputContainer>
          <button
            type="button"
            onClick={() => setShowOtp(true)}
            className="bg-gradient-to-br from-black to-neutral-600 text-white rounded-md h-10 px-4 font-medium shadow-input"
            style={{ marginTop: "24px" }}
          >
            OTP
          </button>
        </div>

        {/* OTP Field */}
        {showOtp && (
          <div className="mb-4">
            <LabelInputContainer>
              <Label htmlFor="otp">OTP</Label>
              <InputOTP maxLength={6}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </LabelInputContainer>
            {email && (
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                OTP sent to {email}
              </p>
            )}
          </div>
        )}

        {/* Current Password Field */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="currentPassword">Current Password</Label>
          <Input
            id="currentPassword"
            type="password"
            placeholder="••••••••"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </LabelInputContainer>

        {/* New Password Field */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            type="password"
            placeholder="••••••••"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </LabelInputContainer>

        {/* Phone Number Field */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            type="tel"
            placeholder="123-456-7890"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </LabelInputContainer>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full mt-4 bg-gradient-to-br from-black to-neutral-600 text-white rounded-md h-10 font-medium"
        >
          Activate Account
        </Button>
      </form>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};