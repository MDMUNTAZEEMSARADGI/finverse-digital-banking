import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";

import {
  getStatement,
  downloadStatement,
} from "../controllers/statement.controller";

const router = Router();

router.get("/:accountId", authenticate, getStatement);

router.get("/:accountId/pdf", authenticate, downloadStatement);

export default router;