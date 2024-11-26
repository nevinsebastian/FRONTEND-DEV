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
