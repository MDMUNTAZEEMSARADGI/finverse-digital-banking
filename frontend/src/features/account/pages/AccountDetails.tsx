import { useParams, Navigate } from "react-router-dom";

import { useAppSelector } from "../../../store/hooks";

const AccountDetails = () => {
  const { id } = useParams();

  const { accounts } = useAppSelector((state) => state.accounts);

  const account = accounts.find((a) => a.id === id);

  if (!account) {
    return <Navigate to="/accounts" />;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Account Details</h1>

      <div className="rounded-xl bg-white p-8 shadow">
        <h2 className="text-2xl font-semibold">
          {account.accountType} Account
        </h2>

        <div className="mt-6 space-y-4">
          <div>
            <span className="font-semibold">Account Number:</span>
            <p>{account.accountNumber}</p>
          </div>

          <div>
            <span className="font-semibold">Balance:</span>
            <p>₹{account.balance.toLocaleString()}</p>
          </div>

          <div>
            <span className="font-semibold">IFSC:</span>
            <p>{account.ifscCode}</p>
          </div>

          <div>
            <span className="font-semibold">Status:</span>
            <p>{account.status}</p>
          </div>

          <div>
            <span className="font-semibold">Created:</span>
            <p>{new Date(account.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
