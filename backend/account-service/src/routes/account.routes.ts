import { Router } from "express";

import {
  openAccount,
  getAccounts,
  getSingleAccount,
  getAccountBalance,
  freeze,
  close,
  depositAmount,
  withdrawAmount,
  getInternalAccount,
} from "../controllers/account.controller";

import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

const router = Router();

router.post("/", authenticate, openAccount);
router.get("/", authenticate, getAccounts);
router.get("/balance/:id", authenticate, getAccountBalance);

router.get("/:id", authenticate, getSingleAccount);

router.patch("/:id/freeze", authenticate, authorize("ADMIN"), freeze);

router.patch("/:id/close", authenticate, authorize("ADMIN"), close);

router.patch("/internal/:id/deposit", depositAmount);

router.get("/internal/:id", getInternalAccount);

router.patch("/internal/:id/withdraw", withdrawAmount);

export default router;
