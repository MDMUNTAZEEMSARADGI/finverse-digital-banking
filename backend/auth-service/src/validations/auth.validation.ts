import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().optional(),
  email: z.email(),
  phone: z.string().min(10).max(10),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/, "Must contain uppercase")
    .regex(/[a-z]/, "Must contain lowercase")
    .regex(/[0-9]/, "Must contain number")
    .regex(/[@$!%*?&]/, "Must contain special character"),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string(),
});