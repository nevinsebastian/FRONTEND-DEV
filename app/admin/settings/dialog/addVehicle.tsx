import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addVehicle } from "../api/addVehicle"; // Import the addVehicle API function
import { useToast } from "@/components/hooks/use-toast"; // Import the toast hook

export function AddVehicle() {
  const [vehicleData, setVehicleData] = useState({
    name: "",
    first_service_time: "",
    service_kms: "",
    total_price: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize the showToast function
  const { showToast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVehicleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await addVehicle(vehicleData); // Call the API function to add the vehicle

      if (response.ok) {
        // Check if the response is successful
        showToast("Vehicle added successfully!", "success");
        setVehicleData({
          name: "",
          first_service_time: "",
          service_kms: "",
          total_price: "",
        });
      } else {
        // Handle error if response is not successful
        const errorMsg = response.statusText || "Failed to add vehicle.";
        showToast(errorMsg, "error");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to add vehicle.");
      showToast("An error occurred while adding the vehicle.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Add Vehicle</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Vehicle</DialogTitle>
          <DialogDescription>
            Enter the details of the new vehicle. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Vehicle Name
            </Label>
            <Input
              id="name"
              name="name"
              value={vehicleData.name}
              onChange={handleChange}
              placeholder="Enter vehicle name"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="first_service_time" className="text-right">
              First Service Time
            </Label>
            <Input
              id="first_service_time"
              name="first_service_time"
              value={vehicleData.first_service_time}
              onChange={handleChange}
              placeholder="Enter first service time"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="service_kms" className="text-right">
              Service KMs
            </Label>
            <Input
              id="service_kms"
              name="service_kms"
              value={vehicleData.service_kms}
              onChange={handleChange}
              placeholder="Enter service KMs"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="total_price" className="text-right">
              Total Price
            </Label>
            <Input
              id="total_price"
              name="total_price"
              value={vehicleData.total_price}
              onChange={handleChange}
              placeholder="Enter total price"
              className="col-span-3"
            />
          </div>
          {error && <p className="text-red-600">{error}</p>}
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Vehicle"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
