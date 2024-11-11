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
  IconSquarePlus,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SidebarDemo() {
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

  const [open, setOpen] = useState(false);

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
                <SidebarLink link={links[0]} className="text-2xl" />
                <div>
                  {/* <IconSquarePlus className="text-neutral-700 dark:text-neutral-200 h-7 w-7 flex-shrink-0" /> */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Edit Profile</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                          Make changes to your profile here. Click save when
                          you&apos;re done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="name"
                            value="Pedro Duarte"
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Username
                          </Label>
                          <Input
                            id="username"
                            value="@peduarte"
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Render the rest of the links */}
              {links.slice(1).map((link, idx) => (
                <SidebarLink key={idx} link={link} className="text-2xl" />
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
      <Dashboard />
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

// Dummy dashboard component with content
const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="p-6 md:p-12 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-6 flex-1 w-full h-full">
        <div className="flex gap-6">
          {[...new Array(4)].map((_, i) => (
            <div
              key={"first-array" + i}
              className="h-32 w-full rounded-lg bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
        <div className="flex gap-6 flex-1">
          {[...new Array(2)].map((_, i) => (
            <div
              key={"second-array" + i}
              className="h-full w-full rounded-lg bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
