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




// api/activate.ts


export const activateEmployee = async (data: {
  email: string;
  current_password: string;
  new_password: string;
  phone_number: string;
}) => {
  try {
    const response = await fetch("http://3.111.52.81:8000/employees/activate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      if (response.status === 400 && errorResponse.detail === "Account is already activated") {
        throw new Error("The account is already activated.");
      }
      // Handle other status codes (422, 500, etc.)
      throw new Error(errorResponse.detail || "Something went wrong.");
    }

    return await response.json();  // Assuming successful activation
  } catch (error: any) {
    console.error("Error during activation:", error.message);
    throw new Error(error.message || "Activation failed.");
  }
};
