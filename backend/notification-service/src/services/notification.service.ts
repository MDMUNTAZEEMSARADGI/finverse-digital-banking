import Notification from "../models/notification.model";

import type { NotificationEvent } from "../types/notification.types";

export const createNotification = async (
  event: NotificationEvent
) => {
  return Notification.create({
    userId: event.userId,

    type: event.type,

    title: event.title,

    message: event.message,

    metadata: event.metadata ?? {},
  });
};

export const getNotifications = async (
  userId: string
) => {
  return Notification.find({
    userId,
  }).sort({
    createdAt: -1,
  });
};

export const getUnreadNotifications = async (
  userId: string
) => {
  return Notification.find({
    userId,

    status: "UNREAD",
  }).sort({
    createdAt: -1,
  });
};

export const markAsRead = async (
  id: string
) => {
  return Notification.findByIdAndUpdate(
    id,
    {
      status: "READ",
    },
    {
      new: true,
    }
  );
};

export const markAllAsRead = async (
  userId: string
) => {
  return Notification.updateMany(
    {
      userId,

      status: "UNREAD",
    },
    {
      status: "READ",
    }
  );
};

export const deleteNotification = async (
  id: string
) => {
  return Notification.findByIdAndDelete(id);
};