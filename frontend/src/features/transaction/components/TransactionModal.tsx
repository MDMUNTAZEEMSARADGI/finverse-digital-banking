import { useState } from "react";

import { X } from "lucide-react";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import {
  depositMoney,
  withdrawMoney,
  transferMoney,
  fetchTransactions,
} from "../redux/transactionThunk";

import { fetchAccounts } from "../../account/redux/accountThunk";

interface Props {
  open: boolean;

  type: "deposit" | "withdraw" | "transfer";

  onClose: () => void;
}

const TransactionModal = ({
  open,
  type,
  onClose,
}: Props) => {
  const dispatch = useAppDispatch();

  const { accounts } = useAppSelector(
    (state) => state.accounts
  );

  const { loading } = useAppSelector(
    (state) => state.transactions
  );

  const [fromAccountId, setFromAccountId] = useState("");

  const [toAccountId, setToAccountId] = useState("");

  const [amount, setAmount] = useState("");

  if (!open) return null;

  const handleSubmit = async () => {
    let result;

    switch (type) {
      case "deposit":
        result = await dispatch(
          depositMoney({
            accountId: fromAccountId,
            amount: Number(amount),
          })
        );
        break;

      case "withdraw":
        result = await dispatch(
          withdrawMoney({
            accountId: fromAccountId,
            amount: Number(amount),
          })
        );
        break;

      case "transfer":
        result = await dispatch(
          transferMoney({
            fromAccountId,
            toAccountId,
            amount: Number(amount),
          })
        );
        break;
    }

    if (
      result &&
      !result.type.endsWith("/rejected")
    ) {
      dispatch(fetchAccounts());

      dispatch(fetchTransactions());

      setAmount("");

      setFromAccountId("");

      setToAccountId("");

      onClose();
    }
  };

  const title =
    type === "deposit"
      ? "Deposit Money"
      : type === "withdraw"
      ? "Withdraw Money"
      : "Transfer Money";

  const buttonColor =
    type === "deposit"
      ? "bg-green-600"
      : type === "withdraw"
      ? "bg-red-600"
      : "bg-blue-600";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-md rounded-xl bg-white p-6">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            {title}
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        {/* From Account */}

        <label className="mb-2 block font-medium">
          {type === "transfer"
            ? "From Account"
            : "Account"}
        </label>

        <select
          value={fromAccountId}
          onChange={(e) =>
            setFromAccountId(e.target.value)
          }
          className="mb-4 w-full rounded-lg border p-3"
        >
          <option value="">
            Select Account
          </option>

          {accounts.map((account) => (
            <option
              key={account.id}
              value={account.id}
            >
              {account.accountType} • ₹
              {account.balance.toLocaleString()}
            </option>
          ))}
        </select>

        {/* To Account */}

        {type === "transfer" && (
          <>
            <label className="mb-2 block font-medium">
              To Account
            </label>

            <select
              value={toAccountId}
              onChange={(e) =>
                setToAccountId(
                  e.target.value
                )
              }
              className="mb-4 w-full rounded-lg border p-3"
            >
              <option value="">
                Select Account
              </option>

              {accounts
                .filter(
                  (a) =>
                    a.id !== fromAccountId
                )
                .map((account) => (
                  <option
                    key={account.id}
                    value={account.id}
                  >
                    {account.accountType} • ₹
                    {account.balance.toLocaleString()}
                  </option>
                ))}
            </select>
          </>
        )}

        {/* Amount */}

        <label className="mb-2 block font-medium">
          Amount
        </label>

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          className="mb-6 w-full rounded-lg border p-3"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full rounded-lg py-3 font-semibold text-white ${buttonColor}`}
        >
          {loading
            ? "Processing..."
            : title}
        </button>

      </div>

    </div>
  );
};

export default TransactionModal;