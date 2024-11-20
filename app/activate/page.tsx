"use client";

import React from "react";
import { ActivationForm } from "@/components/form/activationform";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { cn } from "@/lib/utils";

const ActivatePage = () => {
  return (
    <div className="relative min-h-screen w-full">
      {/* Background Gradient Animation */}
      <BackgroundGradientAnimation />

      {/* Centered Form */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-dvh max-h-lg p-4">
        <ActivationForm />
      </div>
    </div>
  );
};

export default ActivatePage;
  

