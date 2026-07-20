import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getNotifications,
  getUnreadNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
} from "../api/notification.api";


export const fetchNotifications =
createAsyncThunk(
 "notifications/all",

 async(_, thunkAPI)=>{

  try{

   return await getNotifications();

  }catch(error:any){

   return thunkAPI.rejectWithValue(
    error.response?.data?.message ??
    "Failed to fetch notifications"
   );

  }

 }
);



export const fetchUnreadNotifications =
createAsyncThunk(
 "notifications/unread",

 async(_, thunkAPI)=>{

  try{

   return await getUnreadNotifications();

  }catch(error:any){

   return thunkAPI.rejectWithValue(
    "Failed to fetch unread notifications"
   );

  }

 }
);



export const readNotification =
createAsyncThunk(
 "notifications/read",

 async(id:string)=>{

  return await markNotificationRead(id);

 }
);



export const readAllNotifications =
createAsyncThunk(
 "notifications/readAll",

 async()=>{

  return await markAllNotificationsRead();

 }
);



export const removeNotification =
createAsyncThunk(
 "notifications/delete",

 async(id:string)=>{

  await deleteNotification(id);

  return id;

 }
);