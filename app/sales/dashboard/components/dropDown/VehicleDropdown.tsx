import React, { useEffect, useState } from "react";

interface VehicleDropdownProps {
  onSelect: (vehicleId: string, totalPrice: number) => void;
}

const VehicleDropdown: React.FC<VehicleDropdownProps> = ({ onSelect }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    // Retrieve token from local storage
    const storedToken = localStorage.getItem("auth_token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    const fetchVehicles = async () => {
      if (!token) return;
      console.log("Using token:", token); // Debug log

      try {
        const response = await fetch(
          "https://3.111.52.81:8000/vehicle-data/vehicles",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        if (response.ok) {
          const data: Vehicle[] = await response.json();
          setVehicles(data);
        } else {
          console.error(
            "Failed to fetch vehicles:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const vehicle = vehicles.find((v) => v.id.toString() === selectedId);
    if (vehicle) {
      setSelectedVehicle(vehicle);
      onSelect(vehicle.id.toString(), vehicle.total_price);
      localStorage.setItem("selected_vehicle", JSON.stringify(vehicle)); // Save to local storage
    }
  };

  return (
    <div>
      <select onChange={handleChange} className="border p-2 w-full rounded">
        <option value="">Select a Vehicle</option>
        {vehicles.map((vehicle) => (
          <option key={vehicle.id} value={vehicle.id}>
            {vehicle.name}
          </option>
        ))}
      </select>

      {/* Display ex-showroom price if a vehicle is selected */}
      {selectedVehicle && (
        <div className="mt-4">
          <h2>Selected Vehicle: {selectedVehicle.name}</h2>
          <p>
            Ex-Showroom Price: ₹{selectedVehicle.total_price.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

// Define the Vehicle interface
interface Vehicle {
  id: number;
  name: string;
  first_service_time: string;
  service_kms: number;
  total_price: number;
}

export default VehicleDropdown;
