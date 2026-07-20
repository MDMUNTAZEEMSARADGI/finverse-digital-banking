import { Router } from "express";

import {
  getAllNotifications,
  getUnread,
  readNotification,
  readAllNotifications,
  removeNotification,
} from "../controllers/notification.controller";

import { authenticate } from "../middleware/auth.middleware";


const router = Router();


// Get all notifications
router.get(
  "/",
  authenticate,
  getAllNotifications
);


// Get unread notifications
router.get(
  "/unread",
  authenticate,
  getUnread
);


// Mark single notification as read
router.patch(
  "/:id/read",
  authenticate,
  readNotification
);


// Mark all notifications as read
router.patch(
  "/read-all",
  authenticate,
  readAllNotifications
);


// Delete notification
router.delete(
  "/:id",
  authenticate,
  removeNotification
);


export default router;