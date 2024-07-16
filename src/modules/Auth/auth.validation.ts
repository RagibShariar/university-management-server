import { z } from "zod";

export const loginValidationSchema = z.object({
  id: z.string({ required_error: "id is required" }),
  password: z.string({ required_error: "password is required" }),
});
