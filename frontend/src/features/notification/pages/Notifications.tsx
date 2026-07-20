import { useEffect } from "react";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../store/hooks";

import {
  fetchNotifications,
  readAllNotifications,
} from "../redux/notificationThunks";

import NotificationList from "../components/NotificationList";

const Notifications = () => {
  const dispatch = useAppDispatch();

  const {
    notifications,
    loading,
    error,
  } = useAppSelector(
    (state) => state.notifications
  );

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleReadAll = () => {
    dispatch(readAllNotifications());
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading notifications...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Notifications
          </h1>

          <p className="text-gray-500">
            View all your recent banking notifications.
          </p>
        </div>

        <button
          onClick={handleReadAll}
          className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          Mark All as Read
        </button>
      </div>

      <NotificationList
        notifications={notifications}
      />
    </div>
  );
};

export default Notifications;