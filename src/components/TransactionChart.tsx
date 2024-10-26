"use client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Transaction {
  amount: number;
  cardLastDigits: string;
  location: string;
  date: string;
  hour: string;
  bankId: number;
}

interface TransactionChartProps {
  title: string;
  startDate: string;
  endDate: string;
}

export default function TransactionChart({
  title,
  startDate,
  endDate,
}: TransactionChartProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    async function fetchData() {
      const url = `https://2cd2-190-21-152-228.ngrok-free.app/api/v1/transactions/?startDate=${startDate}&endDate=${endDate}`;

      const response = await fetch(url, {
        method: "GET",
        headers: new Headers({
          Authorization: "Basic " + btoa("user:password"), // Replace 'user' and 'pass' with actual credentials
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "1231",
        }),
      });

      if (!response.ok) {
        console.error("Failed to fetch data:", response.statusText);
        return;
      }
      console.log("res", response);

      const data = await response.json();
      setTransactions(data);
    }

    fetchData();
  }, []);

  const data = {
    labels: transactions.map((tx) => `${tx.date} ${tx.hour}`),
    datasets: [
      {
        label: "Transaction Amount",
        data: transactions.map((tx) => tx.amount),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderColor: "rgba(53, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-center mb-2">{title}</h2>
      <Bar data={data} options={options} />
    </div>
  );
}
