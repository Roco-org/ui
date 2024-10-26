"use client";
import { useTransactions } from "@/hooks/useTransactions";
import Summary from "@/components/Summary";
import TransactionList from "@/components/TransactionList";

export default function SummaryPage() {
  const { transactions, totalAmount, amountSpentToday } = useTransactions();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between">
      <main className="container mx-auto px-4 py-6">
        <div className="space-y-8">
          <div className="text-center">
            <button className="bg-gray-200 text-black px-3 py-1 rounded-full text-sm">
              Period: 19 Oct - Today
            </button>
            <div className="text-6xl font-bold mt-4">
              {new Intl.NumberFormat("es-CL", {
                style: "currency",
                currency: "CLP",
              }).format(totalAmount)}
            </div>
            <p className="text-lg text-gray-600 mt-2">Spent so far</p>
            <div className="flex justify-center mt-4">
              <button className="bg-black text-white px-4 py-2 rounded-l-full text-sm">
                Credit
              </button>
              <button className="bg-gray-300 text-black px-4 py-2 rounded-r-full text-sm">
                Debit
              </button>
            </div>
          </div>
          <TransactionList transactions={transactions} />
        </div>
      </main>
    </div>
  );
}
