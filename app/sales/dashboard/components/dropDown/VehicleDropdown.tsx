import React, { useEffect, useState } from "react";

// Define Vehicle interface
interface Vehicle {
  id: number;
  name: string;
  total_price: number;
}

interface VehicleDropdownProps {
  onSelect: (
    vehicleName: string,
    totalPrice: number,
    vehicleId: number
  ) => void;
}

const VehicleDropdown: React.FC<VehicleDropdownProps> = ({ onSelect }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    // Retrieve token from local storage
    const storedToken = localStorage.getItem("auth_token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const fetchVehicles = async () => {
      if (!token) {
        console.error("No token available for fetching vehicles.");
        return;
      }

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

    if (token) {
      fetchVehicles();
    }
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const vehicle = vehicles.find((v) => v.id.toString() === selectedId);

    if (vehicle) {
      setSelectedVehicle(vehicle);
      onSelect(vehicle.name, vehicle.total_price, vehicle.id);
      localStorage.setItem("selected_vehicle", JSON.stringify(vehicle));
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

      {selectedVehicle && (
        <div className="mt-2">
          <strong>Selected Vehicle:</strong> {selectedVehicle.name}
        </div>
      )}
    </div>
  );
};

export default VehicleDropdown;
