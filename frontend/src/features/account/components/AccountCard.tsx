import { Link } from "react-router-dom";

import {
  Landmark,
  CircleDollarSign,
} from "lucide-react";

import type { Account } from "../types/account.types";

interface AccountCardProps {
  account: Account;
}

const AccountCard = ({
  account,
}: AccountCardProps) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow transition hover:shadow-lg">

      <div className="mb-6 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-blue-100 p-3">
            <Landmark className="text-blue-600" />
          </div>

          <div>

            <h2 className="font-semibold text-lg">
              {account.accountType}
            </h2>

            <p className="text-sm text-gray-500">
              {account.accountNumber}
            </p>

          </div>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            account.status === "ACTIVE"
              ? "bg-green-100 text-green-700"
              : account.status === "FROZEN"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {account.status}
        </span>

      </div>

      <div className="mb-6 flex items-center gap-3">

        <CircleDollarSign
          size={22}
          className="text-green-600"
        />

        <h1 className="text-3xl font-bold">
          ₹{account.balance.toLocaleString()}
        </h1>

      </div>

      <Link
        to={`/accounts/${account.id}`}
        className="font-semibold text-blue-600 hover:underline"
      >
        View Details →
      </Link>

    </div>
  );
};

export default AccountCard;