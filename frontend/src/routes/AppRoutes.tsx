import { Routes, Route } from "react-router-dom";

import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";

import Dashboard from "../features/dashboard/pages/Dashboard";

// import NotFound from "../pages/errors/NotFound";

import DashboardLayout from "../layout/DashboardLayout";
import Accounts from "../features/account/pages/Accounts";
import Transactions from "../features/transaction/pages/Transactions";
import Statements from "../features/statements/pages/Statements";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/accounts" element={<Accounts />} />

        <Route path="/transactions" element={<Transactions />} />

        <Route path="/statements" element={<Statements />} />
      </Route>

      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default AppRoutes;
