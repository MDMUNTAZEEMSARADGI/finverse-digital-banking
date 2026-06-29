import { z } from "zod";

export const createKycSchema = z.object({
  aadhaarNumber: z.string().length(12),

  panNumber: z.string().length(10),

  addressLine1: z.string().min(3),

  addressLine2: z.string().optional(),

  city: z.string().min(2),

  state: z.string().min(2),

  country: z.string().min(2),

  postalCode: z.string().min(6),
});
