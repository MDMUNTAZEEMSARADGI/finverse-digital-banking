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

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome Back 👋</h1>

        <p className="text-gray-500">Here's your banking overview.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total Balance"
          value="₹2,45,870"
          icon={Wallet}
          color="bg-blue-600"
          change="+12.4%"
        />

        <StatsCard
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
        />

        <StatsCard
          title="KYC Status"
          value="Verified"
          icon={ShieldCheck}
          color="bg-indigo-600"
        />
      </div>

      {/* account */}
      <div className="space-y-5">
        <h2 className="text-2xl font-bold">My Accounts</h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AccountCard
            accountType="Savings"
            accountNumber="XXXX-4582"
            balance="₹1,25,000"
            status="ACTIVE"
          />

          <AccountCard
            accountType="Current"
            accountNumber="XXXX-8463"
            balance="₹75,000"
            status="ACTIVE"
          />

          <AccountCard
            accountType="Fixed Deposit"
            accountNumber="XXXX-9965"
            balance="₹45,870"
            status="ACTIVE"
          />
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
            to="/transactions/deposit"
          />

          <QuickActionCard
            title="Withdraw"
            description="Withdraw available balance"
            icon={Wallet}
            color="bg-red-500"
            to="/transactions/withdraw"
          />

          <QuickActionCard
            title="Transfer"
            description="Transfer money securely"
            icon={Send}
            color="bg-blue-600"
            to="/transactions/transfer"
          />

          <QuickActionCard
            title="Open Account"
            description="Create a new bank account"
            icon={Landmark}
            color="bg-purple-600"
            to="/accounts/open"
          />
        </div>
      </div>

      {/* balance */}
      <BalanceChart />

      {/* recernt trnsaction */}
      <RecentTransactions />

      {/* notifications */}
      <Notifications />
    </div>
  );
};

export default Dashboard;
