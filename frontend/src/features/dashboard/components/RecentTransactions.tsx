import type { Transaction } from "../types/dashboard.types";

const transactions: Transaction[] = [
  {
    id: "1",
    date: "02 Jul 2026",
    type: "DEPOSIT",
    amount: 10000,
    status: "SUCCESS",
  },
  {
    id: "2",
    date: "01 Jul 2026",
    type: "TRANSFER",
    amount: 5000,
    status: "SUCCESS",
  },
  {
    id: "3",
    date: "29 Jun 2026",
    type: "WITHDRAW",
    amount: 2000,
    status: "SUCCESS",
  },
  {
    id: "4",
    date: "28 Jun 2026",
    type: "DEPOSIT",
    amount: 18000,
    status: "SUCCESS",
  },
];

const statusColor = {
  SUCCESS: "bg-green-100 text-green-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  FAILED: "bg-red-100 text-red-700",
};

const typeColor = {
  DEPOSIT: "text-green-600",
  WITHDRAW: "text-red-600",
  TRANSFER: "text-blue-600",
};

const RecentTransactions = () => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Recent Transactions
        </h2>

        <button className="text-sm font-medium text-blue-600 hover:underline">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-gray-500">
              <th className="pb-3">Date</th>
              <th className="pb-3">Type</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="py-4">
                  {transaction.date}
                </td>

                <td
                  className={`font-semibold ${typeColor[transaction.type]}`}
                >
                  {transaction.type}
                </td>

                <td className="font-medium">
                  ₹{transaction.amount.toLocaleString()}
                </td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor[transaction.status]}`}
                  >
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTransactions;