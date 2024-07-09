import { z } from "zod";
import {
  IMonths,
  ISemesterCode,
  ISemesterName,
} from "./academicSemester.interface";

const months: IMonths[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const academicSemesterName: ISemesterName[] = ["Spring", "Summer", "Fall"];
const academicSemesterCode: ISemesterCode[] = ["01", "02", "03"];

export const createAcademicSemesterValidation = z.object({
  name: z.enum([...academicSemesterName] as [string, ...string[]]),
  year: z.string(),
  code: z.enum([...academicSemesterCode] as [string, ...string[]]),
  startMonth: z.enum([...months] as [string, ...string[]]),
  endMonth: z.enum([...months] as [string, ...string[]]),
});
