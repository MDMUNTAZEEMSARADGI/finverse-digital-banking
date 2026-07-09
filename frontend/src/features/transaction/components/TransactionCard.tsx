import { Link } from "react-router-dom";

import type { Transaction } from "../types/transaction.types";

interface Props {
  transaction: Transaction;
}

const TransactionCard = ({ transaction }: Props) => {
  return (
    <tr className="border-b">
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

      <td className="px-4 py-3">
        <Link
          to={`/transactions/${transaction.id}`}
          className="text-blue-600 hover:underline"
        >
          View
        </Link>
      </td>
    </tr>
  );
};

export default TransactionCard;
