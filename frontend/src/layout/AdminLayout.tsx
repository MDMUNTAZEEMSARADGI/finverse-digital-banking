import { Outlet, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShieldCheck,
  Users,
  Landmark,
  ArrowLeftRight,
  LogOut,
} from "lucide-react";
import LogoutButton from "../features/auth/pages/LogoutButton";

const AdminLayout = () => {
  const navItems = [
    {
      label: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      label: "KYC Management",
      path: "/admin/kyc",
      icon: ShieldCheck,
    },
    {
      label: "Customers",
      path: "/admin/customers",
      icon: Users,
    },
    {
      label: "Accounts",
      path: "/admin/accounts",
      icon: Landmark,
    },
    {
      label: "Transactions",
      path: "/admin/transactions",
      icon: ArrowLeftRight,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Admin Sidebar */}
      <aside className="flex w-64 flex-col bg-slate-900 text-white">
        {/* Logo */}
        <div className="border-b border-slate-700 px-6 py-5">
          <h1 className="text-2xl font-bold">FinVerse</h1>

          <p className="mt-1 text-sm text-slate-400">Admin Panel</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <Icon size={20} />

                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-slate-700 p-4">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex flex-1 flex-col">
        {/* Admin Navbar */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-8">
          <div>
            <h2 className="text-lg font-semibold">Admin Portal</h2>
          </div>

          <div className="text-sm text-gray-500">Administrator</div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
