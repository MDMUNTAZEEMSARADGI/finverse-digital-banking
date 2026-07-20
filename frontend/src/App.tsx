import { useEffect } from "react";

import AppRoutes from "./routes/AppRoutes";

import { useAppDispatch, useAppSelector } from "./store/hooks";

import { loadUser } from "./features/auth/redux/authThunks";

function App() {
  const dispatch = useAppDispatch();

  const token = useAppSelector(
    (state) => state.auth.token
  );

useEffect(() => {
  if (!token) return;

  dispatch(loadUser());
}, [dispatch, token]);

  return <AppRoutes />;
}

export default App;