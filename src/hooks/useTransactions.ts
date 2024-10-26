import { useState, useEffect } from "react";
import { Transaction } from "@/types/Transaction";
import { fetchTransactions } from "@/features/transactions/api";
import { calculateMetrics } from "@/utils/metricsUtils";
import { getToday, getLast19th } from "@/utils/dateUtils";

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [averageAmount, setAverageAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [avgTransactionsPerDay, setAvgTransactionsPerDay] = useState(0);
  const [amountSpentToday, setAmountSpentToday] = useState(0);

  const today = getToday();
  const lastMonth19th = getLast19th();

  useEffect(() => {
    async function fetchData() {
      const data = await fetchTransactions(lastMonth19th, today);
      setTransactions(data);
      const metrics = calculateMetrics(data);
      setTotalAmount(metrics.total);
      setAverageAmount(metrics.average);
      setMaxAmount(metrics.max);
      setAvgTransactionsPerDay(metrics.avgPerDay);

      const todayAmount = data.reduce((acc, transaction) => {
        if (transaction.date === today) {
          return acc + transaction.amount;
        }
        return acc;
      }, 0);

      setAmountSpentToday(todayAmount);
    }

    fetchData();
  }, [lastMonth19th, today]);

  return {
    transactions,
    totalAmount,
    averageAmount,
    maxAmount,
    avgTransactionsPerDay,
    amountSpentToday,
  };
}
