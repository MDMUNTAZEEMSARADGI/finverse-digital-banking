import type { StatementTransaction } from "../types/statement.types";

interface Props {
  transaction: StatementTransaction;
}

const StatementRow = ({ transaction }: Props) => {
  return (
    <tr className="border-b hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3">
        {new Date(transaction.createdAt).toLocaleDateString()}
      </td>

      <td className="px-4 py-3 font-semibold">{transaction.type}</td>

      <td className="px-4 py-3">₹{transaction.amount.toLocaleString()}</td>

      <td className="px-4 py-3">
        <span
          className={`rounded-full px-3 py-1 text-sm ${
            transaction.status === "SUCCESS"
              ? "bg-green-100 text-green-700"
              : transaction.status === "FAILED"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {transaction.status}
        </span>
      </td>

      <td className="px-4 py-3">{transaction.reference}</td>
    </tr>
  );
};

export default StatementRow;
