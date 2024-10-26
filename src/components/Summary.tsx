import React from "react";

type Props = {
  totalAmount: number;
  averageAmount: number;
  maxAmount: number;
  avgTransactionsPerDay: number;
  amountSpentToday: number;
};

export default function Summary({
  totalAmount,
  averageAmount,
  maxAmount,
  avgTransactionsPerDay,
  amountSpentToday,
}: Props) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(amount);
  };

  return (
    <div className="p-2 rounded-lg">
      <h2 className="text-md mb-2">Transaction Summary</h2>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <h3 className="font-semibold">Total spent:</h3>
          <p>{formatCurrency(totalAmount)}</p>
        </div>
        <div>
          <h3 className="font-semibold">Average:</h3>
          <p>{formatCurrency(averageAmount)}</p>
        </div>
        <div>
          <h3 className="font-semibold">Maximum:</h3>
          <p>{formatCurrency(maxAmount)}</p>
        </div>
        <div>
          <h3 className="font-semibold">ATPD:</h3>
          <p>{avgTransactionsPerDay.toFixed(2)}</p>
        </div>
        <div>
          <h3 className="font-semibold">Spent today:</h3>
          <p>{formatCurrency(amountSpentToday)}</p>{" "}
        </div>
      </div>
    </div>
  );
}
