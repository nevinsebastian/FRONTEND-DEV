import axios from 'axios';

const BASE_URL = 'https://3.111.52.81:8000';

export const fetchFormFields = async (formId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/form-builder/forms/customer-fields/${formId}/fields`);
    return response.data;
  } catch (error) {
    console.error('Error fetching form fields:', error);
    throw error;
  }
};

export const fetchSalesData = async (formInstanceId: number) => {
  const response = await fetch(
    `https://3.111.52.81:8000/form-builder/forms/${formInstanceId}/sales-data`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch sales data.");
  }
  return response.json();
};


// api.ts


// Define the base URL for your API
const SUBMIT_URL = "https://3.111.52.81:8000/form-builder";

interface SubmitCustomerDataPayload {
  [key: string]: string; // Adjust the type to match your expected form data structure
}

export const submitCustomerData = async (
  formInstanceId: number,
  data: SubmitCustomerDataPayload
): Promise<void> => {
  try {
    const response = await axios.post(
      `${SUBMIT_URL}/forms/${formInstanceId}/submit/customer`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Data submitted successfully:", response.data);
  } catch (error: any) {
    console.error("Error submitting customer data:", error.response?.data || error.message);
    throw error; // Re-throw the error for handling in the caller
  }
};
