import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import { fetchAccounts } from "../../account/redux/accountThunk";
import { fetchStatement } from "../redux/statementThunk";

import {
  StatementSummary,
  StatementTable,
} from "../components";

const Statements = () => {
  const dispatch = useAppDispatch();

  const { accounts } = useAppSelector(
    (state) => state.accounts
  );

  const {
    statement,
    loading,
    error,
  } = useAppSelector(
    (state) => state.statements
  );

  const [selectedAccount, setSelectedAccount] =
    useState("");

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  const handleGenerate = () => {
    if (!selectedAccount) return;

    dispatch(fetchStatement(selectedAccount));
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold">
          Account Statement
        </h1>

        <p className="text-gray-500 mt-2">
          Generate and view your account statement.
        </p>

      </div>

      {/* Controls */}

      <div className="rounded-xl bg-white p-6 shadow">

        <div className="grid gap-4 md:grid-cols-3">

          <select
            value={selectedAccount}
            onChange={(e) =>
              setSelectedAccount(e.target.value)
            }
            className="rounded-lg border p-3"
          >
            <option value="">
              Select Account
            </option>

            {accounts.map((account) => (
              <option
                key={account.id}
                value={account.id}
              >
                {account.accountType} ••••
                {account.accountNumber.slice(-4)}
              </option>
            ))}
          </select>

          <button
            onClick={handleGenerate}
            disabled={!selectedAccount}
            className="rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Generate Statement
          </button>

          <button
            disabled
            className="rounded-lg bg-gray-300 py-3 text-gray-600 cursor-not-allowed"
          >
            Download PDF (Coming Soon)
          </button>

        </div>

      </div>

      {/* Loading */}

      {loading && (
        <div className="rounded-xl bg-white p-6 shadow text-center">
          Loading statement...
        </div>
      )}

      {/* Error */}

      {!loading && error && (
        <div className="rounded-lg bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Statement */}

      {!loading && statement && (
        <>

          {/* Account */}

          <div className="rounded-xl bg-white p-6 shadow">

            <h2 className="mb-4 text-xl font-bold">
              Account Information
            </h2>

            <div className="grid gap-6 md:grid-cols-2">

              <div>

                <p className="text-sm text-gray-500">
                  Account Number
                </p>

                <p className="font-semibold">
                  {statement.account.accountNumber}
                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Account Type
                </p>

                <p className="font-semibold">
                  {statement.account.accountType}
                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Status
                </p>

                <p className="font-semibold">
                  {statement.account.status}
                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Current Balance
                </p>

                <p className="font-semibold">
                  ₹
                  {statement.account.balance.toLocaleString()}
                </p>

              </div>

            </div>

          </div>

          {/* Summary */}

          <StatementSummary
            summary={statement.summary}
          />

          {/* Transactions */}

          <StatementTable
            transactions={
              statement.transactions
            }
          />

        </>
      )}

    </div>
  );
};

export default Statements;