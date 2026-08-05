import { Router } from "express";

import authenticate from "../middlewares/authenticate.middleware.js";

import authorize from "../middlewares/authorize.middleware.js";

import {

    getDashboardHandler,
    getDashboardAnalyticsHandler

} from "../controllers/dashboard.controller.js";

const router = Router();

router.get(

    "/",
    authenticate,
    authorize("ADMIN"),
    getDashboardHandler

);

router.get(
    "/analytics",
    authenticate,
    authorize("ADMIN"),
    getDashboardAnalyticsHandler
);




export default router;