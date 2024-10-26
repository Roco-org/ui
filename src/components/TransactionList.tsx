import React from "react";
import { Transaction } from "@/types/Transaction";
import { formatDateForDisplay } from "@/utils/dateUtils";

interface TransactionListProps {
  transactions: Transaction[];
}

export default function TransactionList({
  transactions,
}: TransactionListProps) {
  return (
    <div className=" w-full max-w-4xl mx-auto p-2 rounded-lg">
      <h2 className="text-md font-semibold mb-2">Transaction List</h2>
      <ul className="space-y-1 overflow-y-scroll h-[30vh] ">
        {transactions.map((transaction, index) => (
          <li
            key={index}
            className="p-2 bg-white-bg border-b-[1px] text-sm border-b-4"
          >
            <div className="flex justify-between">
              <span className="font-semibold">{transaction.location}</span>

              <span className="font-semibold">
                {" "}
                -
                {new Intl.NumberFormat("es-CL", {
                  style: "currency",
                  currency: "CLP",
                }).format(transaction.amount)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">
                {formatDateForDisplay(transaction.date)}
              </span>
              <span className="text-gray-500">{transaction.hour}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
