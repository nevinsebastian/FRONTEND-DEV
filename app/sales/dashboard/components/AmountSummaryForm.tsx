import React, { useState } from "react";
import axios from "axios";

interface AmountSummaryFormProps {
  vehicleTotalPrice: number;
  vehicleId: number;
  formInstanceId: number;
}

const AmountSummaryForm: React.FC<AmountSummaryFormProps> = ({
  vehicleTotalPrice,
  vehicleId,
  formInstanceId,
}) => {
  const [amountPaid, setAmountPaid] = useState<number>(0);
  const [balanceAmount, setBalanceAmount] = useState<number>(vehicleTotalPrice);

  const handleAmountPaidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const paid = Number(e.target.value);
    setAmountPaid(paid);
    setBalanceAmount(vehicleTotalPrice - paid);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `https://3.111.52.81:8000/form-builder/forms/amount-data/${formInstanceId}/submit/sales`,
        {},
        {
          params: {
            total_price: vehicleTotalPrice,
            amount_paid: amountPaid,
            balance_amount: balanceAmount,
            vehicle_id: vehicleId,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Customer data submitted successfully");
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit customer data.");
    }
  };

  return (
    <div className="mt-6 p-4 border rounded-md bg-gray-100">
      <h2 className="font-bold text-lg mb-4">Amount Summary</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium">
          Total Price: {vehicleTotalPrice}
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Amount Paid:</label>
        <input
          type="number"
          value={amountPaid}
          onChange={handleAmountPaidChange}
          className="mt-1 p-2 border rounded w-full"
          placeholder="Enter amount paid"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Balance Amount:</label>
        <p className="mt-1 p-2 bg-white border rounded">{balanceAmount}</p>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Submit Data
      </button>
    </div>
  );
};

export default AmountSummaryForm;
