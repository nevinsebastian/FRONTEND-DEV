import axios from "axios";

const API_URL = "https://3.111.52.81:8000/vehicle-data/vehicles";

/**
 * Fetch vehicle data from the API.
 * @returns Promise resolving to the list of vehicles.
 */
export async function fetchVehicles() {
  try {
    // Retrieve token from localStorage
    const authToken = localStorage.getItem("auth_token");
    if (!authToken) {
      throw new Error("Authorization token not found. Please log in again.");
    }

    // Make the API call
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching vehicle data:", error);
    throw error;
  }
}
