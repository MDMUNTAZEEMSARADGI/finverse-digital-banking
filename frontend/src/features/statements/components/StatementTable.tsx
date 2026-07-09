import StatementRow from "./StatementRow";

import type {
  StatementTransaction,
} from "../types/statement.types";

interface Props {
  transactions: StatementTransaction[];
}

const StatementTable = ({
  transactions,
}: Props) => {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="px-4 py-3 text-left">
              Date
            </th>

            <th className="px-4 py-3 text-left">
              Type
            </th>

            <th className="px-4 py-3 text-left">
              Amount
            </th>

            <th className="px-4 py-3 text-left">
              Status
            </th>

            <th className="px-4 py-3 text-left">
              Reference
            </th>

          </tr>

        </thead>

        <tbody>

          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <StatementRow
                key={transaction.id}
                transaction={transaction}
              />
            ))
          ) : (
            <tr>

              <td
                colSpan={5}
                className="py-8 text-center text-gray-500"
              >
                No transactions found.
              </td>

            </tr>
          )}

        </tbody>

      </table>

    </div>
  );
};

export default StatementTable;