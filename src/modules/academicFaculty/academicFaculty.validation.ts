import { z } from "zod";

export const academicFacultyValidationSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
});
