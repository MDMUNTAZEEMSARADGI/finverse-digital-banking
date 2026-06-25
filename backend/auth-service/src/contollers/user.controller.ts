import { Request, Response } from "express";

export const getProfile = (req: Request, res: Response) => {
  res.json({
    success: true,
    user: req.user,
  });
};

export const adminDashboard = (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Welcome Admin",
  });
};
