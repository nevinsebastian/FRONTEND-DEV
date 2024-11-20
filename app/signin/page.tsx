"use client";

import React from "react";
import { SignIn } from "./signinform";

const ActivatePage = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-dvh max-h-lg p-4">
      <SignIn />
    </div>
  );
};

export default ActivatePage;
