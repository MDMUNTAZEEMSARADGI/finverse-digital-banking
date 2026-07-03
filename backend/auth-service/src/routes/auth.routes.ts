import { Router } from "express";
import {
  login,
  register,
  refreshToken,
  logout,
} from "../contollers/auth.controller";
import { validate } from "../middlewares/validate.middlware";
import {
  loginSchema,
  registerSchema,
  refreshTokenSchema,
} from "../validations/auth.validation";

const router = Router();

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);
// router.post("/login", login);

router.post("/refresh-token", validate(refreshTokenSchema), refreshToken);

router.post("/logout", logout);

export default router;
