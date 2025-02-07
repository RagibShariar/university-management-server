import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";
import academicDepartmentRouter from "./modules/academicDepartment/academicDepartment.route";
import academicFacultyRouter from "./modules/academicFaculty/academicFaculty.route";
import academicSemesterRouter from "./modules/academicSemester/academicSemester.route";
import adminRouter from "./modules/admin/admin.route";
import authRouter from "./modules/Auth/auth.route";
import courseRouter from "./modules/course/course.route";
import facultyRouter from "./modules/faculty/faculty.route";
import studentRouter from "./modules/student/student.route";
import userRouter from "./modules/user/user.route";

const app = express();

// middlewares
app.use(
  express.json({
    limit: "15kb",
  })
);
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("University management server is running !!!");
});

// Application Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/academic-semesters", academicSemesterRouter);
app.use("/api/v1/academic-faculty", academicFacultyRouter);
app.use("/api/v1/academic-department", academicDepartmentRouter);
app.use("/api/v1/faculties", facultyRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admins", adminRouter);

//global error handler
app.use(globalErrorHandler);
// not found route
app.use(notFound);

export default app;
