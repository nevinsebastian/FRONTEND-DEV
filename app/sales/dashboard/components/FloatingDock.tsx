"use client";

import { useState } from "react";

import { IconHome, IconNewSection } from "@tabler/icons-react";
import InsertChartOutlinedOutlinedIcon from "@mui/icons-material/InsertChartOutlinedOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HomeScreen from "./homescreen";
import CreateCustomerScreen from "./CreateCustomerScreen";
import ProfileScreen from "./ProfileScreen";
import ChatScreen from "./MessageScreen";

const PerformanceScreen = () => (
  <div className="p-4">Welcome to Performance Screen</div>
);

export function FloatingDockDemo() {
  const [activeTab, setActiveTab] = useState("Home");

  const links = [
    {
      title: "Home",
      icon: (
        <IconHome
          className={`h-8 w-8 ${
            activeTab === "Home"
              ? "text-blue-500 dark:text-blue-300"
              : "text-neutral-500 dark:text-neutral-300"
          }`}
        />
      ),
      screen: <HomeScreen />, // Render HomeScreen here
    },
    {
      title: "Create Customer",
      icon: (
        <IconNewSection
          className={`h-8 w-8 ${
            activeTab === "Create Customer"
              ? "text-blue-500 dark:text-blue-300"
              : "text-neutral-500 dark:text-neutral-300"
          }`}
        />
      ),
      screen: <CreateCustomerScreen />,
    },
    {
      title: "Message",
      icon: (
        <ChatBubbleOutlineOutlinedIcon
          className={`h-8 w-8 ${
            activeTab === "Message"
              ? "text-blue-500 dark:text-blue-300"
              : "text-neutral-500 dark:text-neutral-300"
          }`}
        />
      ),
      screen: <ChatScreen />,
    },
    {
      title: "Performance",
      icon: (
        <InsertChartOutlinedOutlinedIcon
          className={`h-8 w-8 ${
            activeTab === "Performance"
              ? "text-blue-500 dark:text-blue-300"
              : "text-neutral-500 dark:text-neutral-300"
          }`}
        />
      ),
      screen: <PerformanceScreen />,
    },
    {
      title: "Profile",
      icon: (
        <AccountCircleOutlinedIcon
          className={`h-9 w-9 ${
            activeTab === "Profile"
              ? "text-blue-500 dark:text-blue-300"
              : "text-neutral-500 dark:text-neutral-300"
          }`}
        />
      ),
      screen: <ProfileScreen />,
    },
  ];

  return (
    <div className="relative">
      {/* Render the active screen */}
      <div className="pb-16">
        {links.find((link) => link.title === activeTab)?.screen}
      </div>

      {/* Floating Dock */}
      <div className="fixed bottom-0 left-0 w-full flex justify-center shadow-md z-50 bg-white dark:bg-black">
        <div className="flex space-x-4">
          {links.map((link, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(link.title)} // Change active tab
              className={`h-14 w-14 flex items-center justify-center rounded-md transition-transform 
                          duration-200 ${
                            activeTab === link.title
                              ? "bg-gray-200 dark:bg-neutral-700"
                              : "bg-gray-100 dark:bg-neutral-800"
                          }`}
            >
              {link.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
