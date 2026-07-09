import { useState } from "react";
import { X } from "lucide-react";

import { useAppDispatch } from "../../../store/hooks";
import { depositMoney, fetchTransactions } from "../redux/transactionThunk";

interface Props {
  open: boolean;
  onClose: () => void;
}

const DepositModal = ({
  open,
  onClose,
}: Props) => {
  const dispatch = useAppDispatch();

  const [accountId, setAccountId] = useState("");
  const [amount, setAmount] = useState("");

  if (!open) return null;

  const handleSubmit = async () => {
    const result = await dispatch(
      depositMoney({
        accountId,
        amount: Number(amount),
      })
    );

    if (depositMoney.fulfilled.match(result)) {
      dispatch(fetchTransactions());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-md rounded-xl bg-white p-6">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            Deposit Money
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <input
          placeholder="Account ID"
          value={accountId}
          onChange={(e) =>
            setAccountId(e.target.value)
          }
          className="mb-4 w-full rounded-lg border p-3"
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          className="mb-6 w-full rounded-lg border p-3"
        />

        <button
          onClick={handleSubmit}
          className="w-full rounded-lg bg-green-600 py-3 text-white"
        >
          Deposit
        </button>

      </div>

    </div>
  );
};

export default DepositModal;