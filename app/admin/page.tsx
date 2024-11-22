"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SidebarDemo } from "./dashboard/SidebarDemo";

export default function Page() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check for auth token and role
    const authToken = localStorage.getItem("auth_token");
    const role = localStorage.getItem("role");

    if (!authToken || role !== "admin") {
      // Redirect to login if not authorized
      router.push("/signin");
    } else {
      // Allow access if authorized
      setIsAuthorized(true);
    }
  }, [router]);

  // Render nothing or a loader while checking authorization
  if (!isAuthorized) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-screen h-screen overflow-hidden">
      <SidebarDemo />
    </div>
  );
}
