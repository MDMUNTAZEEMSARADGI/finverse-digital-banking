import { useAppDispatch } from "../../../store/hooks";

import NotificationCard from "./NotificationCard";

import {
  readNotification,
  removeNotification,
} from "../redux/notificationThunks";

import type { Notification } from "../types/notification.types";

interface NotificationListProps {
  notifications: Notification[];
}

const NotificationList = ({ notifications }: NotificationListProps) => {
  const dispatch = useAppDispatch();

  const handleRead = (id: string) => {
    dispatch(readNotification(id));
  };

  const handleDelete = (id: string) => {
    dispatch(removeNotification(id));
  };

  if (notifications.length === 0) {
    return (
      <div className="rounded-xl bg-white p-10 text-center shadow">
        <h2 className="text-xl font-semibold">No Notifications</h2>

        <p className="mt-2 text-gray-500">You're all caught up 🎉</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onRead={handleRead}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default NotificationList;
