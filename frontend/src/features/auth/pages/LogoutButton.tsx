import { LogOut } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../../store/hooks";

import { logout } from "../redux/authSlice";

const LogoutButton = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());

    navigate("/login",{ replace: true });
  };

  return (
    <button
      onClick={handleLogout}
      className="mx-3 mb-2 flex w-[calc(100%-24px)] items-center gap-3 rounded-lg px-4 py-3 text-slate-300 transition hover:bg-red-600 hover:text-white"
    >
      <LogOut size={20} />

      <span>Logout</span>
    </button>
  );
};

export default LogoutButton;