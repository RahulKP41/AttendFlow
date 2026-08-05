import { Router } from "express";

import authenticate from "../middlewares/authenticate.middleware.js";

import authorize from "../middlewares/authorize.middleware.js";

import {

    getTeacherDashboardHandler

} from "../controllers/teacher-dashboard.controller.js";

const router = Router();

router.get(

    "/",

    authenticate,

    authorize("TEACHER"),

    getTeacherDashboardHandler

);

export default router;