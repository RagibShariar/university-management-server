import { z } from "zod";

export const userValidationSchema = z.object({
  // id: z.string(),  // auto generated
  password: z
    .string({ required_error: "password is required" })
    .min(6, { message: "password must be at least 6 characters longer" })
    .max(20, { message: "password can not be more than 20 characters" })
    .optional(),
  // needsPasswordChange: z.boolean().default(true).optional(),
  // role: z.enum(["student", "faculty", "admin"]),
  // status: z.enum(["in-progress", "blocked"]).default("in-progress"),
  // isDeleted: z.boolean().default(false).optional(),
});
