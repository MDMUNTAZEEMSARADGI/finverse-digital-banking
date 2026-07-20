import { createSlice } from "@reduxjs/toolkit";

import {
  fetchNotifications,
  fetchUnreadNotifications,
  readNotification,
  readAllNotifications,
  removeNotification,
} from "./notificationThunks";

import type {
  Notification,
} from "../types/notification.types";


interface NotificationState {

  notifications: Notification[];

  unreadCount: number;

  loading: boolean;

  error: string | null;

}


const initialState: NotificationState = {

  notifications: [],

  unreadCount: 0,

  loading: false,

  error: null,

};



const notificationSlice = createSlice({

  name: "notifications",

  initialState,


  reducers:{},


  extraReducers:(builder)=>{


    builder


    // Fetch all notifications

    .addCase(
      fetchNotifications.pending,
      (state)=>{
        state.loading = true;
        state.error = null;
      }
    )


    .addCase(
      fetchNotifications.fulfilled,
      (state, action)=>{
        
        state.loading = false;

        state.notifications =
          action.payload.notifications;


        state.unreadCount =
          state.notifications.filter(
            (notification)=>
              notification.status==="UNREAD"
          ).length;

      }
    )


    .addCase(
      fetchNotifications.rejected,
      (state, action)=>{

        state.loading=false;

        state.error =
          action.payload as string;

      }
    )



    // Fetch unread

    .addCase(
      fetchUnreadNotifications.fulfilled,
      (state, action)=>{

        state.unreadCount =
          action.payload.notifications.length;

      }
    )



    // Mark one notification read

    .addCase(
      readNotification.fulfilled,
      (state, action)=>{

        const index =
          state.notifications.findIndex(
            (n)=>
              n.id === action.payload.id
          );


        if(index !== -1){

          state.notifications[index]
            =
          action.payload;

        }


        state.unreadCount =
          state.notifications.filter(
            (n)=>
              n.status==="UNREAD"
          ).length;

      }
    )



    // Mark all read

    .addCase(
      readAllNotifications.fulfilled,
      (state)=>{

        state.notifications =
          state.notifications.map(
            (notification)=>({
              ...notification,
              status:"READ",
            })
          );


        state.unreadCount = 0;

      }
    )



    // Delete notification

    .addCase(
      removeNotification.fulfilled,
      (state, action)=>{


        state.notifications =
          state.notifications.filter(
            (notification)=>
              notification.id !== action.payload
          );


        state.unreadCount =
          state.notifications.filter(
            (n)=>
              n.status==="UNREAD"
          ).length;

      }
    );


  },


});


export default notificationSlice.reducer;