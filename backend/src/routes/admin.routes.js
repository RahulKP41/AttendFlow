import { Router } from "express";

import authenticate from "../middlewares/authenticate.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";
import { createStudentSchema } from "../validators/admin.validator.js";

import {
    dashboard,
    createTeacherHandler,
    getTeachersHandler,
    getTeacherByIdHandler,
    updateTeacherHandler,
    deleteTeacherHandler,
    getStudentsHandler
} from "../controllers/admin.controller.js";


const router = Router();

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

router.get(
    "/dashboard",
    authenticate,
    authorize("ADMIN"),
    dashboard
);

router.get(
    "/teachers",
    authenticate,
    authorize("ADMIN"),
    getTeachersHandler
);

router.get(
    "/teachers/:id",
    authenticate,
    authorize("ADMIN"),
    getTeacherByIdHandler
);

router.put(
    "/teachers/:id",
    authenticate,
    authorize("ADMIN"),
    validate(updateTeacherSchema),
    updateTeacherHandler
);

router.delete(
    "/teachers/:id",
    authenticate,
    authorize("ADMIN"),
    deleteTeacherHandler
);

router.post(
    "/students",
    authenticate,
    authorize("ADMIN"),
    validate(createStudentSchema),
    createStudentHandler
);

router.get(
    "/students",
    authenticate,
    authorize("ADMIN"),
    getStudentsHandler
);

export default router;