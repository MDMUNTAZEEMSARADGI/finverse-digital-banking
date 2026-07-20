import { Routes, Route } from "react-router-dom";

import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";

import Dashboard from "../features/dashboard/pages/Dashboard";
import Accounts from "../features/account/pages/Accounts";
import Transactions from "../features/transaction/pages/Transactions";
import Statements from "../features/statements/pages/Statements";

import DashboardLayout from "../layout/DashboardLayout";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Notifications from "../features/notification/pages/Notifications";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected Routes */}

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/accounts" element={<Accounts />} />

          <Route path="/transactions" element={<Transactions />} />

          <Route path="/statements" element={<Statements />} />

          <Route path="/notifications" element={<Notifications />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
