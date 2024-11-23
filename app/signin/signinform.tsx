"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter(); // For navigation

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Call your API
      const response = await signIn(email, password);

      if (response.detail) {
        setErrorMessage(response.detail);
      } else if (response.access_token) {
        console.log("Login successful");

        // Store token in localStorage
        localStorage.setItem("auth_token", response.access_token);
        localStorage.setItem("role", response.role); // Store user role

        // Role-based routing
        switch (response.role) {
          case "admin":
            router.push("/admin");
            break;
          case "sales_executive":
            router.push("/sales/dashboard");
            break;
          default:
            setErrorMessage("Role not recognized");
            break;
        }
      }
    } catch (error) {
      console.error("Error during login", error);
      setErrorMessage("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Gluping
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to access your account.
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </LabelInputContainer>

        <Button
          type="submit"
          className="bg-gradient-to-br from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 text-white rounded-md h-10 w-full font-medium"
        >
          Sign In
        </Button>

        {errorMessage && (
          <div className="mt-4 text-red-600">{errorMessage}</div>
        )}
      </form>
      <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
        Didnt activate account?{" "}
        <Link href="/activate" className="text-blue-500 hover:underline">
          Activate
        </Link>
      </p>
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

export const signIn = async (email: string, password: string) => {
  const formData = new URLSearchParams();
  formData.append("grant_type", "");
  formData.append("username", email);
  formData.append("password", password);
  formData.append("scope", "");
  formData.append("client_id", "");
  formData.append("client_secret", "");

  const response = await fetch("https://3.111.52.81:8000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
};
