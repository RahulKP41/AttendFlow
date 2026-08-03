import { Router } from "express";

import { login, me } from "../controllers/auth.controller.js";
import authenticate from "../middlewares/authenticate.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { loginSchema } from "../validators/auth.validator.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/

// Login
router.post(
    "/login",
    validate(loginSchema),
    login
);

// Current Logged-in User
router.get(
    "/me",
    authenticate,
    me
);

export default router;