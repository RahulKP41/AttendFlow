import { Router } from "express";

import authRoutes from "./auth.routes.js";
import adminRoutes from "./admin.routes.js";
import subjectRoutes from "./subject.routes.js";
import classRoutes from "./class.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/subjects", subjectRoutes);
router.use("/classes", classRoutes);

export default router;