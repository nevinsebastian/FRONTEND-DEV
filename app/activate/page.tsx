"use client";

import React from "react";
import { ActivationForm } from "@/components/form/activationform";
const ActivatePage = () => {
  return (
    <div className="activation-page">
      <h1 className="text-2xl font-bold mb-4">Activate Your Account</h1>
      <ActivationForm />
    </div>
  );
};

export default ActivatePage;
