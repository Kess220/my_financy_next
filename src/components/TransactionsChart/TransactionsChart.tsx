import React from "react";
import { Doughnut } from "react-chartjs-2";
import { useTransactions } from "@/contexts/TransactionContext";
import { Chart as ChartJS, Title, Tooltip, Legend, registerables } from 'chart.js';

ChartJS.register(...registerables, Title, Tooltip, Legend);

const TransactionsChart: React.FC = () => {
  const { transactions } = useTransactions();

  const data = transactions.reduce<{ Deposito: number; Retirada: number }>((acc, transaction) => {
    if (transaction.type === "deposit") {
      acc.Deposito += transaction.value;
    } else if (transaction.type === "withdrawal") {
      acc.Retirada += transaction.value;
    }
    return acc;
  }, { Deposito: 0, Retirada: 0 });

  const chartData = {
    labels: [
      "Depósito",
      "Retirada"
    ],
    datasets: [
      {
        data: [data.Deposito, data.Retirada],
        backgroundColor: [
          "rgb(13, 176, 122)",
          "rgb(48, 67, 124)"
        ],
        borderColor: [
          "rgb(13, 176, 122)",
          "rgb(51, 74, 145)"
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    plugins: {
      title: {
        display: true,
      },
      tooltip: {
        enabled: true
      },
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          color: "black",
          font: {
            size: 14
          }
        }
      }
    }
  };

  return (
    <div>
      <h2>Total de Transações por Mês</h2>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default TransactionsChart;
