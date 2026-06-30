import express from "express";
import { deposit, withdraw, transfer, getHistory, getTransaction } from "../controllers/transaction.controller";
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

router.post(
  "/transfer",
  authenticate,
  transfer
)

router.get(
  "/history",
  authenticate,
  getHistory
);

router.get(
  "/:id",
  authenticate,
  getTransaction
);

export default router;