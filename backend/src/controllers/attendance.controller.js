import asyncHandler from "../utils/async-handler.js";
import ApiResponse from "../utils/api-response.js";

import {
    markAttendance,
    getAttendanceByDate,
    updateAttendance,
    getStudentAttendanceHistory,
    getAttendancePercentage,
    getSubjectWiseAttendance,
    getMonthlyAttendance
} from "../services/attendance.service.js";



export const markAttendanceHandler = asyncHandler(async (req, res) => {

    const attendance = await markAttendance(req.body);

    return res.status(201).json(
        new ApiResponse(
            201,
            attendance,
            "Attendance marked successfully."
        )
    );

});

export const getAttendanceByDateHandler =
    asyncHandler(async (req, res) => {

        const attendance =
            await getAttendanceByDate(
                req.query.classId,
                req.query.subjectId,
                req.query.date
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                attendance,
                "Attendance fetched successfully."
            )
        );

    });

    
export const updateAttendanceHandler =
asyncHandler(async (req, res) => {

    const attendance =
        await updateAttendance(
            req.params.id,
            req.body
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            attendance,
            "Attendance updated successfully."
        )
    );

});

export const getStudentAttendanceHistoryHandler =
asyncHandler(async (req, res) => {

    const attendance =
        await getStudentAttendanceHistory(
            req.params.studentId
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            attendance,
            "Attendance history fetched successfully."
        )
    );

});

export const getAttendancePercentageHandler =
asyncHandler(async (req, res) => {

    const statistics =
        await getAttendancePercentage(
            req.params.studentId
        );

    return res.status(200).json(

        new ApiResponse(

            200,

            statistics,

            "Attendance percentage calculated."

        )

    );

});

export const getSubjectWiseAttendanceHandler =
asyncHandler(async (req, res) => {

    const report =
        await getSubjectWiseAttendance(
            req.params.studentId
        );

    return res.status(200).json(

        new ApiResponse(

            200,

            report,

            "Subject-wise attendance report."

        )

    );

});

export const getMonthlyAttendanceHandler =
asyncHandler(async (req, res) => {

    const report =
        await getMonthlyAttendance(

            req.params.studentId,

            req.query.month,

            req.query.year

        );

    return res.status(200).json(

        new ApiResponse(

            200,

            report,

            "Monthly attendance report."

        )

    );

});