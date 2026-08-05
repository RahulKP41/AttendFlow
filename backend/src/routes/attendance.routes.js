import { Router } from "express";

import authenticate from "../middlewares/authenticate.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import {
    markAttendanceSchema,
    updateAttendanceSchema
} from "../validators/attendance.validator.js";

import {
    markAttendanceHandler,
    getAttendanceByDateHandler,
    updateAttendanceHandler,
    getStudentAttendanceHistoryHandler,
    getAttendancePercentageHandler,
    getSubjectWiseAttendanceHandler,
    getMonthlyAttendanceHandler
} from "../controllers/attendance.controller.js";

const router = Router();

router.post(
    "/",
    authenticate,
    authorize("TEACHER"),
    validate(markAttendanceSchema),
    markAttendanceHandler
);

router.get(
    "/",
    authenticate,
    authorize("TEACHER", "ADMIN"),
    getAttendanceByDateHandler
);

router.put(
    "/:id",
    authenticate,
    authorize("TEACHER"),
    validate(updateAttendanceSchema),
    updateAttendanceHandler
);

router.get(
    "/student/:studentId",
    authenticate,
    authorize("ADMIN", "TEACHER", "STUDENT"),
    getStudentAttendanceHistoryHandler
);

router.get(
    "/percentage/:studentId",
    authenticate,
    authorize("ADMIN", "TEACHER", "STUDENT"),
    getAttendancePercentageHandler
);

router.get(
    "/subject-report/:studentId",
    authenticate,
    authorize("ADMIN", "TEACHER", "STUDENT"),
    getSubjectWiseAttendanceHandler
);

router.get(
    "/monthly/:studentId",
    authenticate,
    authorize(
        "ADMIN",
        "TEACHER",
        "STUDENT"
    ),
    getMonthlyAttendanceHandler
);



export default router;