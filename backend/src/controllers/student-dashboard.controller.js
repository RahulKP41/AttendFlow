import asyncHandler from "../utils/async-handler.js";
import ApiResponse from "../utils/api-response.js";
import {

    getStudentDashboard

} from "../services/student-dashboard.service.js";



export const getStudentDashboardHandler =
asyncHandler(async (req,res)=>{

    const dashboard =
        await getStudentDashboard(
            req.user.id
        );

    return res.status(200).json(

        new ApiResponse(

            200,

            dashboard,

            "Student dashboard loaded."

        )

    );

});