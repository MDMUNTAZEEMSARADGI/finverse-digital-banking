import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(3, "Name is required"),
  phone: z.string().min(10),
  email: z.email("Please enter a valid email"),
  password: z.string().min(6),
});