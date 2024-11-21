import React from "react";
import {
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
} from "@tabler/icons-react";
import InsertChartOutlinedOutlinedIcon from "@mui/icons-material/InsertChartOutlinedOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
export function FloatingDockDemo() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

    {
      title: "Create Customer",
      icon: (
        <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Message",
      icon: (
        <ChatBubbleOutlineOutlinedIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Prefomensence",
      icon: (
        <InsertChartOutlinedOutlinedIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

    {
      title: "Profile",
      icon: (
        <AccountCircleOutlinedIcon className="h-full w-full text-xl	     text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center shadow-md z-50">
      <div className="flex space-x-4">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className="h-10 w-10 flex items-center justify-center rounded-md 
                       bg-gray-100 dark:bg-neutral-800 md:hover:scale-110 
                       transition-transform duration-200 md:hover:bg-gray-200"
          >
            {link.icon}
          </a>
        ))}
      </div>
    </div>
  );
}
