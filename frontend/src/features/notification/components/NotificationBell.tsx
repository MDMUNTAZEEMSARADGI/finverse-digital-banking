import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import { fetchUnreadNotifications } from "../redux/notificationThunks";

const NotificationBell = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { notifications, unreadCount } = useAppSelector(
    (state) => state.notifications,
  );

  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUnreadNotifications());
  }, [dispatch]);

  const latestNotifications = notifications.slice(0, 5);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="
          relative
          rounded-full
          p-2
          hover:bg-slate-100
        "
      >
        <Bell size={24} />

        {unreadCount > 0 && (
          <span
            className="
                absolute
                -right-1
                -top-1
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded-full
                bg-red-600
                text-xs
                text-white
              "
          >
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          className="
              absolute
              right-0
              mt-3
              w-96
              rounded-xl
              bg-white
              shadow-xl
              border
              z-50
            "
        >
          <div
            className="
              border-b
              p-4
              font-semibold
            "
          >
            Notifications
          </div>

          <div className="max-h-80 overflow-y-auto">
            {latestNotifications.length === 0 ? (
              <p
                className="
                  p-5
                  text-center
                  text-gray-500
                "
              >
                No notifications
              </p>
            ) : (
              latestNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="
                      border-b
                      p-4
                      text-sm
                    "
                >
                  <p className="font-medium">{notification.title}</p>

                  <p className="text-gray-500">{notification.message}</p>
                </div>
              ))
            )}
          </div>

          <button
            onClick={() => navigate("/notifications")}
            className="
                w-full
                p-3
                text-blue-600
                hover:bg-gray-50
              "
          >
            View all notifications
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
