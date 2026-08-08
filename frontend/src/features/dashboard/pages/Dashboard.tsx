import {
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  ShieldCheck,
  PlusCircle,
  Landmark,
  Send,
  PiggyBank,
} from "lucide-react";

import {
  StatsCard,
  AccountCard,
  QuickActionCard,
  BalanceChart,
  RecentTransactions,
  Notifications,
} from "../components";

import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import { fetchDashboard } from "../redux/dashboardThunks";

const Dashboard = () => {
  const dispatch = useAppDispatch();

  const { data, loading } = useAppSelector((state) => state.dashboard);

  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  if (loading || !data) {
    return <div className="py-10 text-center">Loading Dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome Back, {user?.firstName} { user?.lastName}👋</h1>
        <p className="text-gray-500">Here's your banking overview.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total Balance"
          value={`₹${data.totalBalance.toLocaleString("en-IN")}`}
          icon={Wallet}
          color="bg-blue-600"
          // change="+12.4%"
        />

        {/* <StatsCard
          title="Monthly Income"
          value="₹85,000"
          icon={ArrowDownCircle}
          color="bg-green-600"
          change="+8.1%"
        />

        <StatsCard
          title="Monthly Expense"
          value="₹36,500"
          icon={ArrowUpCircle}
          color="bg-red-500"
          change="-3.2%"
        /> */}

        <StatsCard
          title="KYC Status"
          value={data.kyc?.status ?? "NOT SUBMITTED"}
          icon={ShieldCheck}
          color={
            data.kyc?.status === "APPROVED"
              ? "bg-green-600"
              : data.kyc?.status === "REJECTED"
                ? "bg-red-600"
                : "bg-yellow-500"
          }
        />
      </div>

      {/* account */}
      <div className="space-y-5">
        <h2 className="text-2xl font-bold">My Accounts</h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {data.accounts.map((account) => (
            <AccountCard
              key={account.id}
              accountType={account.accountType}
              accountNumber={account.accountNumber}
              balance={`₹${account.balance.toLocaleString("en-IN")}`}
              status={account.status}
            />
          ))}
        </div>
      </div>

      {/* quick aciton */}
      <div className="space-y-5">
        <h2 className="text-2xl font-bold">Quick Actions</h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <QuickActionCard
            title="Deposit"
            description="Add money to your account"
            icon={PlusCircle}
            color="bg-green-600"
            to="/transactions?type=deposit"
          />

          <QuickActionCard
            title="Withdraw"
            description="Withdraw available balance"
            icon={Wallet}
            color="bg-red-500"
            to="/transactions?type=withdraw"
          />

          <QuickActionCard
            title="Transfer"
            description="Transfer money securely"
            icon={Send}
            color="bg-blue-600"
            to="/transactions?type=transfer"
          />

          <QuickActionCard
            title="Open Account"
            description="Create a new bank account"
            icon={Landmark}
            color="bg-purple-600"
            to="/accounts?type=open"
          />
        </div>
      </div>

      {/* balance */}
      <BalanceChart />

      {/* recernt trnsaction */}
      <RecentTransactions transactions={data.transactions.slice(0, 5)} />

      {/* notifications */}
      <Notifications notifications={data.notifications.slice(0, 5)} />
    </div>
  );
};

export default Dashboard;
