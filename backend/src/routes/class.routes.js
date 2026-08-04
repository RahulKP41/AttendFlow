import { Router } from "express";

import authenticate from "../middlewares/authenticate.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import {
    createClassSchema
} from "../validators/class.validator.js";

import {
    createClassHandler
} from "../controllers/class.controller.js";

const router = Router();

router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    validate(createClassSchema),
    createClassHandler
);

export default router;