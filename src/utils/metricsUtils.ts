import { Transaction } from "../types/Transaction";

export const calculateMetrics = (data: Transaction[]) => {
  const total = data.reduce(
    (acc: number, transaction: Transaction) => acc + transaction.amount,
    0
  );
  const average = total / data.length;
  const max = Math.max(...data.map((tx: Transaction) => tx.amount));

  const transactionsByDate = data.reduce(
    (acc: Record<string, number>, transaction: Transaction) => {
      acc[transaction.date] = acc[transaction.date]
        ? acc[transaction.date] + 1
        : 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const numDays = Object.keys(transactionsByDate).length;
  const avgPerDay = numDays > 0 ? data.length / numDays : 0;

  return { total, average, max, avgPerDay };
};
