export const verifyEmail = async (email: string): Promise<string> => {
  const apiUrl = `http://3.111.52.81:8000/verify-email?email=${email}`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to send OTP");
    }

    const data = await response.json();
    return data.msg || "OTP sent successfully.";
  } catch (error: any) {
    console.error("Error in verifyEmail:", error);
    throw new Error(error.message || "An unexpected error occurred.");
  }
};




// api/activate.ts
export const verifyOtp = async (email: string, otp: string) => {
  const response = await fetch(
    `http://3.111.52.81:8000/verify-otp?email=${encodeURIComponent(email)}&otp_code=${encodeURIComponent(otp)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to verify OTP");
  }

  const data = await response.json();
  return data;
};
