import { z } from "zod";

export const depositSchema = z.object({
  accountId: z.string().min(1, "Account is required"),

  amount: z
    .number({
      error: "Amount is required",
    })
    .positive("Amount must be greater than zero"),
});

export const withdrawSchema = depositSchema;

export const transferSchema = z.object({
  fromAccountId: z.string().min(1),

  toAccountId: z.string().min(1),

  amount: z
    .number({
      error: "Amount is required",
    })
    .positive(),
});