import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";
import { getProfile, adminDashboard } from "../contollers/user.controller";
import { Role } from "@prisma/client";

const router = Router();

router.get("/profile", authenticate, getProfile);

router.get("/admin", authenticate, authorize(Role.ADMIN), adminDashboard);

export default router;
