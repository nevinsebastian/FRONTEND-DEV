"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SidebarDemo } from "./components/SideBar";

const SalesDashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "sales_executive") {
      router.push("/signin"); // Redirect if role doesn't match
    }
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      router.push("/signin"); // Redirect to login page if no token
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("role");
    router.push("/signin");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <SidebarDemo handleLogout={handleLogout} />
    </div>
  );
};

export default SalesDashboard;
