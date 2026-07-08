import type { AccountCardProps } from "../types/dashboard.types";

const AccountCard = ({
  accountType,
  accountNumber,
  balance,
  status,
}: AccountCardProps) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {accountType}
        </h2>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            status === "ACTIVE"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status}
        </span>
      </div>

      <p className="mt-5 text-gray-500">
        Account Number
      </p>

      <h3 className="font-mono text-lg">
        {accountNumber}
      </h3>

      <p className="mt-5 text-gray-500">
        Available Balance
      </p>

      <h1 className="mt-1 text-3xl font-bold text-blue-600">
        {balance}
      </h1>
    </div>
  );
};

export default AccountCard;