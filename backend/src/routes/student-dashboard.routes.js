import { Router } from "express";

import authenticate from "../middlewares/authenticate.middleware.js";

import authorize from "../middlewares/authorize.middleware.js";

import {

    getStudentDashboardHandler

} from "../controllers/student-dashboard.controller.js";

const router = Router();

router.get(

    "/",

    authenticate,

    authorize("STUDENT"),

    getStudentDashboardHandler

);

export default router;