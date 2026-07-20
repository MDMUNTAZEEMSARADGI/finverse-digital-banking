import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "../store/hooks";

const PublicRoute = () => {
  const token = useAppSelector(
    (state) => state.auth.token
  );

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;