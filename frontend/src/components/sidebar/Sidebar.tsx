import {
  LayoutDashboard,
  Wallet,
  ArrowRightLeft,
  ShieldCheck,
  Bell,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import SidebarItem from "./Sidebaritem";

const Sidebar = () => {
  return (
    <aside className="h-screen w-64 bg-slate-900 text-white">
      <div className="border-b border-slate-700 p-6">
        <h1 className="text-2xl font-bold text-blue-400">FinVerse</h1>

        <p className="mt-1 text-sm text-slate-400">Digital Banking</p>
      </div>

      <nav className="mt-6">
        {/* Sidebar items go here */}
        <SidebarItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />

        <SidebarItem to="/accounts" icon={Wallet} label="Accounts" />

        <SidebarItem
          to="/transactions"
          icon={ArrowRightLeft}
          label="Transactions"
        />

        <SidebarItem to="/kyc" icon={ShieldCheck} label="KYC" />

        <SidebarItem to="/notifications" icon={Bell} label="Notifications" />

        <SidebarItem to="/profile" icon={User} label="Profile" />

        <SidebarItem to="/settings" icon={Settings} label="Settings" />

        <SidebarItem to="/login" icon={LogOut} label="Logout" />
      </nav>
    </aside>
  );
};

export default Sidebar;
