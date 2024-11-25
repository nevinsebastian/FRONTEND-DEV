"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchVehicles } from "../api/table";

interface Vehicle {
  id: number;
  name: string;
  first_service_time: string;
  service_kms: number;
  total_price: number;
}

export function TableDemo() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const data = await fetchVehicles();
        setVehicles(data);
      } catch (err) {
        setError("Failed to fetch vehicle data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadVehicles();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <Table>
      <TableCaption>A list of vehicles in your dealership.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Vehicle Name</TableHead>
          <TableHead>First Service Time</TableHead>
          <TableHead>Service KMs</TableHead>
          <TableHead className="text-right">Total Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vehicles.map((vehicle) => (
          <TableRow key={vehicle.id}>
            <TableCell className="font-medium">{vehicle.name}</TableCell>
            <TableCell>{vehicle.first_service_time} days</TableCell>
            <TableCell>{vehicle.service_kms} kms</TableCell>
            <TableCell className="text-right">₹{vehicle.total_price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow></TableRow>
      </TableFooter>
    </Table>
  );
}
