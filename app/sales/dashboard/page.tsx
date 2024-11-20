"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SalesDashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role === "sales_executive") {
      // Logic for Sales Executive view
    } else {
      router.push("/signin"); // Redirect if role doesn't match
    }
  }, [router]);

  useEffect(() => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem("auth_token");

    if (!token) {
      // Redirect to login page if no token
      router.push("/signin");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("role");
    router.push("/signin");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Welcome to the Sales Dashboard</h1>
        <p className="text-gray-700 mt-2">
          Use the navbar to navigate through features.
        </p>
      </div>
    </div>
  );
};

export default SalesDashboard;
