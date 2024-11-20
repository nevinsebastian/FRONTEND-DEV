"use client";

import React, { useState, useEffect } from "react";
import { verifyEmail } from "@/app/activate/api/activate";
import { verifyOtp } from "@/app/activate/api/activate";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

// ActivationForm component
export function ActivationForm() {
  const [showOtp, setShowOtp] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otpCode, setOtpCode] = useState<string>(""); // Store OTP code
  const [otpMessage, setOtpMessage] = useState<string>(""); // Display OTP sent message
  const [isVerified, setIsVerified] = useState<boolean>(false); // Track if OTP is verified
  const [emailVerifiedMessage, setEmailVerifiedMessage] = useState<string>("");

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // API call to verify email and send OTP
  const handleSendOtp = async () => {
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const message = await verifyEmail(email); // Call API function
      setOtpMessage(message);
      setShowOtp(true);
    } catch (error: any) {
      alert(error.message || "Failed to send OTP. Please try again.");
    }
  };

  // Handle OTP input and check if OTP is complete (6 digits)
  const handleOtpChange = (otp: string) => {
    setOtpCode(otp);

    // If OTP is complete, verify it
    if (otp.length === 6) {
      handleVerifyOtp(otp);
    }
  };

  // API call to verify OTP
  const handleVerifyOtp = async (otp: string) => {
    try {
      const response = await verifyOtp(email, otp);
      if (response.msg === "Email verified successfully.") {
        setIsVerified(true); // OTP successfully verified
        setEmailVerifiedMessage("Email Verified");
      }
    } catch (error: any) {
      alert(error.message || "OTP verification failed. Please try again.");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted", {
      email,
      currentPassword,
      newPassword,
      phoneNumber,
    });
    // Add further activation logic here
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
          <Button
            type="button"
            onClick={handleSendOtp}
            disabled={!isValidEmail(email)}
            className={cn(
              "bg-gradient-to-br from-black to-neutral-600 text-white rounded-md h-10 px-4 font-medium shadow-input",
              {
                "opacity-50 cursor-not-allowed": !isValidEmail(email),
              }
            )}
            style={{ marginTop: "24px" }}
          >
            Send OTP
          </Button>
        </div>

        {/* OTP Field */}
        {showOtp && (
          <div className="mb-4">
            <LabelInputContainer>
              <Label htmlFor="otp">OTP</Label>
              <InputOTP
                maxLength={6}
                value={otpCode}
                onChange={handleOtpChange}
              >
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
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
              {otpMessage}
            </p>
            {isVerified && (
              <div className="mt-2 text-green-500 flex items-center">
                <span className="mr-2">&#10003;</span> {emailVerifiedMessage}
              </div>
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

// Helper component for input containers
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
