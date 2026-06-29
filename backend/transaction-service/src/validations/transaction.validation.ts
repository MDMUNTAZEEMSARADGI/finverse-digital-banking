import { z } from "zod";

export const depositSchema = z.object({
  accountId: z.string().uuid(),
  amount: z.number().positive(),
});
