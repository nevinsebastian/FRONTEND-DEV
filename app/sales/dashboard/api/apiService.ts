// apiService.ts

export const createFormInstance = async (customerName: string) => {
  const token = localStorage.getItem("auth_token");

  if (!token) {
    throw new Error("No token found. Please log in again.");
  }

  const response = await fetch(
    `http://3.111.52.81:8000/form-builder/forms/create?customer_name=${customerName}`,
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
    "http://3.111.52.81:8000/form-builder/forms/active",
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
