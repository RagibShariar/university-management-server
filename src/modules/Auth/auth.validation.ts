import { z } from "zod";

export const loginValidationSchema = z.object({
  id: z.string({ required_error: "id is required" }),
  password: z.string({ required_error: "password is required" }),
});

export const changePasswordValidationSchema = z.object({
  oldPassword: z.string({ required_error: "current password is required" }),
  newPassword: z.string({ required_error: "new password is required" }),
});
