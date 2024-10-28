// hooks/useTransactions.ts
import { useState, useEffect, useRef } from "react";
import { Transaction } from "@/types/Transaction";
import { fetchTransactions } from "@/features/transactions/api";
import { calculateMetrics } from "@/utils/metricsUtils";
import { format } from "date-fns";

interface Metrics {
  total: number;
  average: number;
  max: number;
  avgPerDay: number;
}

interface UseTransactionsReturn {
  transactions: Transaction[];
  totalAmount: number;
  averageAmount: number;
  maxAmount: number;
  avgTransactionsPerDay: number;
  amountSpentToday: number;
  loading: boolean;
  error: string | null;
}

export function useTransactions(startDate: Date | null, endDate: Date | null): UseTransactionsReturn {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [averageAmount, setAverageAmount] = useState<number>(0);
  const [maxAmount, setMaxAmount] = useState<number>(0);
  const [avgTransactionsPerDay, setAvgTransactionsPerDay] = useState<number>(0);
  const [amountSpentToday, setAmountSpentToday] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const prevEndDateRef = useRef<Date | null>(null);

  useEffect(() => {
    // Only fetch if both dates are provided and endDate has changed
    if (startDate && endDate) {
      // Check if endDate has changed
      if (
        prevEndDateRef.current &&
        format(endDate, "yyyy-MM-dd") === format(prevEndDateRef.current, "yyyy-MM-dd")
      ) {
        // End date hasn't changed; do not fetch
        return;
      }

      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          // Format dates to 'YYYY-MM-DD'
          const formattedStart: string = format(startDate, "yyyy-MM-dd");
          const formattedEnd: string = format(endDate, "yyyy-MM-dd");

          // Fetch transactions based on the date range
          const data: Transaction[] = await fetchTransactions(formattedStart, formattedEnd);
          setTransactions(data);

          // Calculate metrics
          const metrics: Metrics = calculateMetrics(data);
          setTotalAmount(metrics.total);
          setAverageAmount(metrics.average);
          setMaxAmount(metrics.max);
          setAvgTransactionsPerDay(metrics.avgPerDay);

          // Calculate amount spent today
          const todayFormatted: string = format(new Date(), "yyyy-MM-dd");
          const todayAmount: number = data.reduce((acc, transaction) => {
            if (transaction.date === todayFormatted) {
              return acc + transaction.amount;
            }
            return acc;
          }, 0);
          setAmountSpentToday(todayAmount);
        } catch (err: unknown) {
          console.error("Error fetching transactions:", err);
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("Failed to fetch transactions. Please try again later.");
          }
        } finally {
          setLoading(false);
        }
      };

      fetchData();

      // Update the previous endDate
      prevEndDateRef.current = endDate;
    } else {
      // Reset states if dates are not provided
      setTransactions([]);
      setTotalAmount(0);
      setAverageAmount(0);
      setMaxAmount(0);
      setAvgTransactionsPerDay(0);
      setAmountSpentToday(0);
    }
  }, [startDate, endDate]);

  return {
    transactions,
    totalAmount,
    averageAmount,
    maxAmount,
    avgTransactionsPerDay,
    amountSpentToday,
    loading,
    error,
  };
}
