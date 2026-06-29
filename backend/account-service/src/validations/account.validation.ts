import { z } from "zod";

export const createAccountSchema = z.object({
  type: z.enum(["SAVINGS", "CURRENT"]),
});
