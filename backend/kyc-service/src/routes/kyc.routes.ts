import { Router } from "express";

import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

import {
  createKyc,
  getKyc,
  editKyc,
  getAllKyc,
  approve,
  reject,
} from "../controllers/kyc.controller";

const router = Router();

router.post("/", authenticate, createKyc);

router.get("/me", authenticate, getKyc);

router.put("/", authenticate, editKyc);

router.get("/admin", authenticate, authorize("ADMIN"), getAllKyc);

router.patch("/admin/:id/approve", authenticate, authorize("ADMIN"), approve);

router.patch("/admin/:id/reject", authenticate, authorize("ADMIN"), reject);

export default router;
