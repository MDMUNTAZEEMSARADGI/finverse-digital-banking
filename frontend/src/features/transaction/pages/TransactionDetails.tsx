import { useParams, Navigate } from "react-router-dom";

import { useAppSelector } from "../../../store/hooks";

const TransactionDetails = () => {
  const { id } = useParams();

  const { transactions } = useAppSelector((state) => state.transactions);

  const transaction = transactions.find((t) => t.id === id);

  if (!transaction) {
    return <Navigate to="/transactions" replace />;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Transaction Details</h1>

      <div className="rounded-xl bg-white p-8 shadow">
        <div className="space-y-5">
          <div>
            <p className="text-sm text-gray-500">Transaction ID</p>

            <p className="font-medium">{transaction.id}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Type</p>

            <p>{transaction.type}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Amount</p>

            <p className="text-2xl font-bold">
              ₹{transaction.amount.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Status</p>

            <p>{transaction.status}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Reference</p>

            <p>{transaction.reference}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Account ID</p>

            <p>{transaction.accountId}</p>
          </div>

          {transaction.receiverAccountId && (
            <div>
              <p className="text-sm text-gray-500">Receiver Account</p>

              <p>{transaction.receiverAccountId}</p>
            </div>
          )}

          <div>
            <p className="text-sm text-gray-500">Date</p>

            <p>{new Date(transaction.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
