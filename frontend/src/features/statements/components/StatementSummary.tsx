import type { StatementSummary as Summary } from "../types/statement.types";

interface Props {
  summary: Summary;
}

const StatementSummary = ({ summary }: Props) => {
  const cards = [
    {
      title: "Current Balance",
      value: `₹${summary.currentBalance.toLocaleString()}`,
      color: "bg-blue-50 text-blue-700",
    },
    {
      title: "Total Deposits",
      value: `₹${summary.totalDeposits.toLocaleString()}`,
      color: "bg-green-50 text-green-700",
    },
    {
      title: "Total Withdrawals",
      value: `₹${summary.totalWithdrawals.toLocaleString()}`,
      color: "bg-red-50 text-red-700",
    },
    {
      title: "Total Transfers",
      value: `₹${summary.totalTransfers.toLocaleString()}`,
      color: "bg-yellow-50 text-yellow-700",
    },
    {
      title: "Transactions",
      value: summary.transactionCount,
      color: "bg-gray-100 text-gray-700",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`rounded-xl p-6 shadow ${card.color}`}
        >
          <p className="text-sm font-medium">
            {card.title}
          </p>

          <h2 className="mt-3 text-2xl font-bold">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default StatementSummary;