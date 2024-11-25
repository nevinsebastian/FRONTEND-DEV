import axios from "axios";

const API_URL = "https://3.111.52.81:8000/vehicle-data/vehicles/";

export const addVehicle = async (vehicleData: {
  name: string;
  first_service_time: string;
  service_kms: string;
  total_price: string;
}) => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("auth_token");
    
    // If the token is missing, handle accordingly (throw an error or return)
    if (!token) {
      throw new Error("Authorization token not found");
    }

    const response = await axios.post(API_URL, vehicleData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Use dynamic authorization token
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Error adding vehicle");
  }
};
