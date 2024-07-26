import { Router } from "express";
import { adminControllers } from "./admin.controller";


const adminRouter = Router();

adminRouter.get("/", adminControllers.getAllAdmins);
adminRouter.get("/:id", adminControllers.getSingleAdmin);


export default adminRouter;