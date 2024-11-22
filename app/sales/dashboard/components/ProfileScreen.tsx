"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const ProfileScreen = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("auth_token");
    localStorage.removeItem("role");

    // Redirect to the login page
    router.push("/signin");
  };

  return (
    <div className="relative p-4">
      {/* Logout Button */}
      <Button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </Button>

      {/* Profile Content */}
      <h1 className="text-2xl font-bold">Profile</h1>
      <p>Welcome to your profile screen!</p>
    </div>
  );
};

export default ProfileScreen;
