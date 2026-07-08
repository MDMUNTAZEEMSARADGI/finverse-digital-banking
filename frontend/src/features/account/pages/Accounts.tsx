import { useEffect } from "react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import { fetchAccounts } from "../redux/accountThunk";

import { AccountCard, OpenAccountModal } from "../components";

const Accounts = () => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useAppDispatch();

  const { accounts, loading, error } = useAppSelector(
    (state) => state.accounts,
  );

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>{error}</h2>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Accounts</h1>

          <p className="text-gray-500">View and manage all your accounts.</p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="rounded-lg bg-blue-600 px-5 py-3 text-white"
        >
          Open Account
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {accounts.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))}
      </div>

      {/* next component */}
      <OpenAccountModal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

export default Accounts;
