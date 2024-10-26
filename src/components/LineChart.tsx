"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Transaction } from "@/types/Transaction";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  title: string;
  transactions: Transaction[];
}

export default function LineChart({ title, transactions }: LineChartProps) {
  const dataChart = {
    labels: transactions.map((tx) => {
      const date = new Date(tx.date + "T" + tx.hour);
      return `${date.getDate()}/${
        date.getMonth() + 1
      } ${date.getHours()}:${date.getMinutes()}`;
    }),
    datasets: [
      {
        label: "Banco de Chile",
        data: transactions.map((tx) => tx.amount),
        fill: false,
        backgroundColor: "rgba(0, 0, 0, 1)", // Black
        borderColor: "rgba(0, 0, 0, 1)", // Black
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        ticks: {
          color: "#000000",
          autoSkip: true,
          maxTicksLimit: 10,
          maxRotation: 90,
          minRotation: 45,
          font: {
            size: 10,
          },
        },
        grid: {
          color: "#D1D1D1",
        },
      },
      y: {
        ticks: {
          color: "#000000",
          beginAtZero: true,
          font: {
            size: 10,
          },
        },
        grid: {
          color: "#D1D1D1",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#000000",
          usePointStyle: true,
          pointStyle: "rectRounded",
          font: {
            size: 10,
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-wrap justify-center items-start gap-2 p-2">
      <h2 className="text-md font-semibold text-center mb-2">{title}</h2>
      <Line data={dataChart} options={options} />
    </div>
  );
}
