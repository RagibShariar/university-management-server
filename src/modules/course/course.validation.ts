import { z } from "zod";

const preRequisiteCourseValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional().default(false),
});

export const createCourseValidationSchema = z.object({
  title: z.string(),
  prefix: z.string(),
  code: z.string(),
  credit: z.number(),
  preRequisiteCourse: z.array(preRequisiteCourseValidationSchema).optional(),
  isDeleted: z.boolean().default(false),
});

export const updateCourseValidationSchema = z.object({
  title: z.string().optional(),
  prefix: z.string().optional(),
  code: z.string().optional(),
  credit: z.number().optional(),
  preRequisiteCourse: z.array(preRequisiteCourseValidationSchema).optional(),
  isDeleted: z.boolean().default(false).optional(),
});
