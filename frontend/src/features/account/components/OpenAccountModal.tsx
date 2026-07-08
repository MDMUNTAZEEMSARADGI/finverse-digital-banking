import { useState } from "react";

import { X } from "lucide-react";

import { useAppDispatch } from "../../../store/hooks";

import { createAccount } from "../redux/accountThunk";

const OpenAccountModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const dispatch = useAppDispatch();

  const [accountType, setAccountType] = useState<
    "SAVINGS" | "CURRENT" | "FIXED_DEPOSIT"
  >("SAVINGS");

  if (!open) return null;

  const handleSubmit = async () => {
    const result = await dispatch(
      createAccount({
        accountType,
      })
    );

    if (createAccount.fulfilled.match(result)) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-md rounded-2xl bg-white p-6">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            Open New Account
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <label className="mb-2 block font-medium">
          Account Type
        </label>

        <select
          value={accountType}
          onChange={(e) =>
            setAccountType(
              e.target.value as any
            )
          }
          className="mb-6 w-full rounded-lg border p-3"
        >
          <option value="SAVINGS">
            Savings
          </option>

          <option value="CURRENT">
            Current
          </option>

          <option value="FIXED_DEPOSIT">
            Fixed Deposit
          </option>
        </select>

        <button
          onClick={handleSubmit}
          className="w-full rounded-lg bg-blue-600 py-3 text-white"
        >
          Open Account
        </button>

      </div>

    </div>
  );
};

export default OpenAccountModal;