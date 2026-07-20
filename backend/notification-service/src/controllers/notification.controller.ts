import { Request, Response } from "express";

import {
  getNotifications,
  getUnreadNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../services/notification.service";


export const getAllNotifications = async (
  req: Request,
  res: Response
) => {
  try {

    const userId = req.user!.id;

    const notifications =
      await getNotifications(userId);


    res.json({
      success: true,
      notifications,
    });


  } catch(error:any){

    res.status(500).json({
      success:false,
      message:error.message,
    });

  }
};



export const getUnread = async (
  req: Request,
  res: Response
) => {

  try {

    const userId = req.user!.id;


    const notifications =
      await getUnreadNotifications(userId);


    res.json({
      success:true,
      notifications,
    });


  } catch(error:any){

    res.status(500).json({
      success:false,
      message:error.message,
    });

  }

};



export const readNotification = async (
  req: Request,
  res: Response
) => {

  try {

    const notification =
      await markAsRead(req.params.id);


    res.json({
      success:true,
      notification,
    });


  } catch(error:any){

    res.status(500).json({
      success:false,
      message:error.message,
    });

  }

};



export const readAllNotifications = async (
  req: Request,
  res: Response
) => {

  try {

    const userId = req.user!.id;


    await markAllAsRead(userId);


    res.json({
      success:true,
      message:"All notifications marked as read",
    });


  } catch(error:any){

    res.status(500).json({
      success:false,
      message:error.message,
    });

  }

};



export const removeNotification = async (
  req: Request,
  res: Response
) => {

  try {

    await deleteNotification(req.params.id);


    res.json({
      success:true,
      message:"Notification deleted",
    });


  } catch(error:any){

    res.status(500).json({
      success:false,
      message:error.message,
    });

  }

};