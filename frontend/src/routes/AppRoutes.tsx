import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";

import Dashboard from "../features/dashboard/pages/Dashboard";
import Accounts from "../features/account/pages/Accounts";
import Transactions from "../features/transaction/pages/Transactions";
import Statements from "../features/statements/pages/Statements";
import Notifications from "../features/notification/pages/Notifications";
import Kyc from "../features/kyc/pages/Kyc";

import AccountDetails from "../features/account/pages/AccountDetails";
import TransactionDetails from "../features/transaction/pages/TransactionDetails";

import AdminDashboard from "../features/admin/pages/AdminDashboard";
import AdminKyc from "../features/admin/pages/AdminKyc";

import DashboardLayout from "../layout/DashboardLayout";
import AdminLayout from "../layout/AdminLayout";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const AppRoutes = () => {
  return (
    <Routes>


      {/* ROOT */}
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      {/* ========================= */}
      {/* PUBLIC ROUTES */}
      {/* ========================= */}

      <Route element={<PublicRoute />}>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

      </Route>


      {/* ========================= */}
      {/* CUSTOMER ROUTES */}
      {/* ========================= */}

      <Route element={<ProtectedRoute />}>

        <Route element={<DashboardLayout />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/accounts"
            element={<Accounts />}
          />

          <Route
            path="/accounts/:id"
            element={<AccountDetails />}
          />

          <Route
            path="/transactions"
            element={<Transactions />}
          />

          <Route
            path="/transactions/:id"
            element={<TransactionDetails />}
          />

          <Route
            path="/statements"
            element={<Statements />}
          />

          <Route
            path="/notifications"
            element={<Notifications />}
          />

          <Route
            path="/kyc"
            element={<Kyc />}
          />

        </Route>


        {/* ========================= */}
        {/* ADMIN ROUTES */}
        {/* ========================= */}

        <Route element={<AdminLayout />}>

          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/kyc"
            element={<AdminKyc />}
          />

        </Route>

      </Route>

    </Routes>
  );
};

export default AppRoutes;
