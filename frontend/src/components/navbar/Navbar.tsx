import { Search, Moon, Sun, UserCircle } from "lucide-react";

import { useState } from "react";

import { useAppSelector } from "../../store/hooks";

import NotificationBell from "../../features/notification/components/NotificationBell";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const { user } = useAppSelector((state) => state.auth);

  return (
    <header className="flex h-18 items-center justify-between border-b bg-white px-8">
      {/* Left */}

      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
      </div>

      {/* Center */}

      <div className="relative hidden md:block">
        <Search size={18} className="absolute left-3 top-3 text-gray-400" />

        <input
          type="text"
          placeholder="Search..."
          className="w-80 rounded-lg border py-2 pl-10 pr-4 outline-none focus:border-blue-500"
        />
      </div>

      {/* Right */}

      <div className="flex items-center gap-5">
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun /> : <Moon />}
        </button>

        <NotificationBell />

        <button className="flex items-center gap-2">
          <UserCircle size={36} />

          <div className="hidden text-left md:block">
            <p className="font-semibold">{user?.name || "User"}</p>

            <p className="text-xs text-gray-500">{user?.role || "CUSTOMER"}</p>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
