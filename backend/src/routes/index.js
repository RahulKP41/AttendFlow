import { Router } from "express";

import authRoutes from "./auth.routes.js";
import adminRoutes from "./admin.routes.js";
import subjectRoutes from "./subject.routes.js";
import classRoutes from "./class.routes.js";
import attendanceRoutes from "./attendance.routes.js";
import dashboardRoutes from "./dashboard.routes.js";
import teacherDashboardRoutes from "./teacher-dashboard.routes.js";
import studentDashboardRoutes from "./student-dashboard.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/subjects", subjectRoutes);
router.use("/classes", classRoutes);
router.use("/attendance", attendanceRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/teacher-dashboard", teacherDashboardRoutes);
router.use("/student-dashboard", studentDashboardRoutes);

export default router;