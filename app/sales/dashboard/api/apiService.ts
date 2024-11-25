// apiService.ts

export const createFormInstance = async (customerName: string) => {
  const token = localStorage.getItem("auth_token");

  if (!token) {
    throw new Error("No token found. Please log in again.");
  }

  const response = await fetch(
    `https://3.111.52.81:8000/form-builder/forms/create?customer_name=${customerName}`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create form instance");
  }

  const data = await response.json();
  return data.form_instance_id;
};

export const fetchFormFields = async (formInstanceId: number) => {
  const token = localStorage.getItem("auth_token");

  if (!token) {
    throw new Error("No token found. Please log in again.");
  }

  const response = await fetch(
    "https://3.111.52.81:8000/form-builder/forms/active",
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch form fields");
  }

  const data = await response.json();
  return data; // Return the form fields data
};

export const submitFormData = async (formInstanceId: number, formData: Record<string, any>) => {
  const token = localStorage.getItem("auth_token");

  if (!token) {
    throw new Error("No token found. Please log in again.");
  }

  const response = await fetch(
    `https://3.111.52.81:8000/form-builder/forms/${formInstanceId}/submit/sales`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData), // Send data as JSON
    }
  );

  if (!response.ok) {
    const errorDetails = await response.json();
    throw new Error(errorDetails.detail || "Failed to submit the form data");
  }

  const responseData = await response.json();

  // Extract and return form_instance_id from the response body
  const formInstanceIdFromResponse = responseData.form_instance_id;
  
  return formInstanceIdFromResponse;
};



// apiServices.ts

export const fetchVehicles = async (token: string): Promise<any[]> => {
  try {
    const response = await fetch("https://3.111.52.81:8000/vehicle-data/vehicles", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch vehicles");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || "Error fetching vehicles");
  }
};
