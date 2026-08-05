import asyncHandler from "../utils/async-handler.js";
import ApiResponse from "../utils/api-response.js";

import {

    getTeacherDashboard

} from "../services/teacher-dashboard.service.js";

export const getTeacherDashboardHandler =
asyncHandler(async (req, res) => {

    const dashboard =
        await getTeacherDashboard(
            req.user.id
        );

    return res.status(200).json(

        new ApiResponse(

            200,

            dashboard,

            "Teacher dashboard loaded."

        )

    );

});