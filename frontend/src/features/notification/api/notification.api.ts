import api from "../../../api/axios";

import type {
  NotificationResponse,
  Notification,
} from "../types/notification.types";


export const getNotifications =
async (): Promise<NotificationResponse> => {

  const response =
    await api.get(
      "/notifications"
    );

  return response.data;
};



export const getUnreadNotifications =
async (): Promise<NotificationResponse> => {

  const response =
    await api.get(
      "/notifications/unread"
    );

  return response.data;
};



export const markNotificationRead =
async (
  id:string
): Promise<Notification> => {

  const response =
    await api.patch(
      `/notifications/${id}/read`
    );

  return response.data.notification;
};



export const markAllNotificationsRead =
async () => {

  const response =
    await api.patch(
      "/notifications/read-all"
    );

  return response.data;

};



export const deleteNotification =
async (
 id:string
)=>{

 const response =
 await api.delete(
   `/notifications/${id}`
 );

 return response.data;

};