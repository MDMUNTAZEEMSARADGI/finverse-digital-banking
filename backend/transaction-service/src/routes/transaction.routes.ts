import express from "express";
import { deposit, withdraw } from "../controllers/transaction.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router =
  express.Router();

router.post(
  "/deposit",
  authenticate,
  deposit
);

router.post(
  "/withdraw",
  authenticate,
  withdraw
)

export default router;