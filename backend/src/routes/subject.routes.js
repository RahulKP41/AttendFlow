import { Router } from "express";

import authenticate from "../middlewares/authenticate.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import {
    createSubjectSchema,
    updateSubjectSchema
} from "../validators/subject.validator.js";

import {
    createSubjectHandler,
    getSubjectsHandler,
    getSubjectByIdHandler,
    updateSubjectHandler,
    deleteSubjectHandler
} from "../controllers/subject.controller.js";

const router = Router();

router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    validate(createSubjectSchema),
    createSubjectHandler
);

router.get(
    "/",
    authenticate,
    authorize("ADMIN"),
    getSubjectsHandler
);

router.get(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    getSubjectByIdHandler
);

router.put(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    validate(updateSubjectSchema),
    updateSubjectHandler
);

router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    deleteSubjectHandler
);

export default router;