import asyncHandler from "../utils/async-handler.js";
import ApiResponse from "../utils/api-response.js";

import {
    getDashboard,
    getMonthlyStudentRegistrations,
    getAttendanceTrend,
    getDepartmentStatistics
} from "../services/dashboard.service.js";

export const getDashboardHandler =
asyncHandler(async (req,res)=>{

    const dashboard =
        await getDashboard();

    return res.status(200).json(

        new ApiResponse(

            200,

            dashboard,

            "Dashboard loaded successfully."

        )

    );

});

export const getDashboardAnalyticsHandler =
asyncHandler(async (req, res) => {

    const [

        registrations,

        attendanceTrend,

        departmentStatistics

    ] = await Promise.all([

        getMonthlyStudentRegistrations(),

        getAttendanceTrend(),

        getDepartmentStatistics()

    ]);

    return res.status(200).json(

        new ApiResponse(

            200,

            {

                registrations,

                attendanceTrend,

                departmentStatistics

            },

            "Dashboard analytics fetched successfully."

        )

    );

});


