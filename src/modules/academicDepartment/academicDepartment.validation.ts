import { z } from "zod";

export const academicDepartmentValidationSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "department name must be a string",
  }),
  academicFaculty: z.string({
    required_error: "Academic Faculty is required",
    invalid_type_error: "Name must be a string",
  }),
});
export const updateAcademicDepartmentValidationSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "department name must be a string",
    })
    .optional(),
  academicFaculty: z
    .string({
      required_error: "Academic Faculty is required",
      invalid_type_error: "Name must be a string",
    })
    .optional(),
});
