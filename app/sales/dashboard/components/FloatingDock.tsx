import React, { useState } from "react";
import { IconHome, IconNewSection } from "@tabler/icons-react";
import InsertChartOutlinedOutlinedIcon from "@mui/icons-material/InsertChartOutlinedOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

// Screens for different tabs
const HomeScreen = () => <div className="p-4">Welcome to Home Screen</div>;
const CreateCustomerScreen = () => (
  <div className="p-4">Welcome to Create Customer Screen</div>
);
const MessageScreen = () => (
  <div className="p-4">Welcome to Message Screen</div>
);
const PerformanceScreen = () => (
  <div className="p-4">Welcome to Performance Screen</div>
);
const ProfileScreen = () => (
  <div className="p-4">Welcome to Profile Screen</div>
);

export function FloatingDockDemo() {
  const [activeTab, setActiveTab] = useState("Home"); // State to track the active tab

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
      screen: <HomeScreen />,
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
      screen: <MessageScreen />,
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
      {/* Render the currently active screen */}
      <div className="pb-16">
        {links.find((link) => link.title === activeTab)?.screen}
      </div>

      {/* Floating Dock */}
      <div className="fixed bottom-0 left-0 w-full flex justify-center shadow-md z-50 bg-white dark:bg-black">
        <div className="flex space-x-4">
          {links.map((link, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(link.title)} // Update the active tab
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
