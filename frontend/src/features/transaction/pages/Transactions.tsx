import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import { fetchTransactions } from "../redux/transactionThunk";

import {
  TransactionCard,
  TransactionModal,
} from "../components";

const Transactions = () => {
  const dispatch = useAppDispatch();

  const { transactions, loading, error } =
    useAppSelector((state) => state.transactions);

  const [modalOpen, setModalOpen] =
    useState(false);

  const [modalType, setModalType] = useState<
    "deposit" | "withdraw" | "transfer"
  >("deposit");

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Transactions
          </h1>

          <p className="text-gray-500">
            Manage all your transactions.
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={() => {
              setModalType("deposit");
              setModalOpen(true);
            }}
            className="rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700"
          >
            Deposit
          </button>

          <button
            onClick={() => {
              setModalType("withdraw");
              setModalOpen(true);
            }}
            className="rounded-lg bg-red-600 px-5 py-3 text-white hover:bg-red-700"
          >
            Withdraw
          </button>

          <button
            onClick={() => {
              setModalType("transfer");
              setModalOpen(true);
            }}
            className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
          >
            Transfer
          </button>

        </div>

      </div>

      {/* Loading */}

      {loading && (
        <div className="rounded-lg bg-white p-6 text-center shadow">
          Loading transactions...
        </div>
      )}

      {/* Error */}

      {!loading && error && (
        <div className="rounded-lg bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Table */}

      {!loading && !error && (
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

                <th className="px-4 py-3 text-left">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <TransactionCard
                    key={transaction.id}
                    transaction={transaction}
                  />
                ))
              ) : (
                <tr>

                  <td
                    colSpan={6}
                    className="py-8 text-center text-gray-500"
                  >
                    No transactions found.
                  </td>

                </tr>
              )}

            </tbody>

          </table>

        </div>
      )}

      {/* Reusable Modal */}

      <TransactionModal
        open={modalOpen}
        type={modalType}
        onClose={() => setModalOpen(false)}
      />

    </div>
  );
};

export default Transactions;