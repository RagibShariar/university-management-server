export type IMonths =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export type ISemesterName = "Spring" | "Summer" | "Fall";
export type ISemesterCode = "01" | "02" | "03";

export type IAcademicSemester = {
  name: ISemesterName;
  year: string;
  code: ISemesterCode;
  startMonth: IMonths;
  endMonth: IMonths;
};
