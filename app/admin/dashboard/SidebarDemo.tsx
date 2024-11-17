"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandItch,
  IconSettings,
  IconMan,
  IconReportAnalytics,
  IconRun,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import AddDealership from "@/components/dialogus/AddDealership";
import DealershipDashboard from "./DealershipDashboard";
import SettingsPage from "../settings/settings";

export function SidebarDemo() {
  const [open, setOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState(""); // Track selected sidebar link

  const links = [
    {
      label: "Dealerships",
      href: "#",
      icon: (
        <IconBrandItch className="text-neutral-700 dark:text-neutral-200 h-7 w-7 flex-shrink-0" />
      ),
    },
    {
      label: "Employees",
      href: "#",
      icon: (
        <IconMan className="text-neutral-700 dark:text-neutral-200 h-7 w-7 flex-shrink-0" />
      ),
    },
    {
      label: "Customer",
      href: "#",
      icon: (
        <IconRun className="text-neutral-700 dark:text-neutral-200 h-7 w-7 flex-shrink-0" />
      ),
    },
    {
      label: "Feedbacks",
      href: "#",
      icon: (
        <IconReportAnalytics className="text-neutral-700 dark:text-neutral-200 h-7 w-7 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-7 w-7 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-7 w-7 flex-shrink-0" />
      ),
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row w-screen h-screen bg-gray-100 dark:bg-neutral-800 overflow-hidden"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-12">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-12 flex flex-col gap-6">
              {/* Dealerships link and Add button in a horizontal flex container */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSelectedLink("Dealerships")}
                  className="flex items-center gap-2 text-2xl"
                >
                  <SidebarLink link={links[0]} className="text-2xl" />
                </button>
                <AddDealership />
              </div>

              {/* Render the rest of the links */}
              {links.slice(1).map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedLink(link.label)}
                  className="text-2xl"
                >
                  <SidebarLink link={link} />
                </button>
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Natesh Premanandhan",
                href: "#",
                icon: (
                  <Image
                    src="https://avatars.githubusercontent.com/u/124599?v=4"
                    className="h-12 w-12 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
              className="text-xl"
            />
          </div>
        </SidebarBody>
      </Sidebar>
      {/* Pass the selected link to the Dashboard */}
      <Dashboard selectedLink={selectedLink} />
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-bold flex space-x-4 items-center text-2xl text-black py-2 relative z-20"
    >
      <div className="h-7 w-8 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        GLUPING
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-bold flex space-x-4 items-center text-2xl text-black py-2 relative z-20"
    >
      <div className="h-7 w-8 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

// Updated Dashboard component with conditional "Branch" button
const Dashboard = ({ selectedLink }) => {
  return (
    <div className="flex flex-1">
      <div className="p-6 md:p-12 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-6 flex-1 w-full h-full">
        {/* Conditionally render "Dealership" or "Settings" component based on selected sidebar link */}
        {selectedLink === "Dealerships" && <DealershipDashboard />}
        {selectedLink === "Settings" && <SettingsPage />}{" "}
        {/* Render SettingsPage when selected */}
        <div className="flex gap-6">
          {[...new Array(4)].map((_, i) => (
            <div key={"first-array" + i}></div>
          ))}
        </div>
        <div className="flex gap-6 flex-1">
          {[...new Array(2)].map((_, i) => (
            <div key={"second-array" + i}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

// New SettingsPage Component (a placeholder for your Settings content)

