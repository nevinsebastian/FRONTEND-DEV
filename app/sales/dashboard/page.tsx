"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { FloatingDockDemo } from "./components/FloatingDock";

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
    <div>
      <FloatingDockDemo />
    </div>
  );
};

export default SalesDashboard;
