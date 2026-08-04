import asyncHandler from "../utils/async-handler.js";
import ApiResponse from "../utils/api-response.js";
import { getDashboardStatistics } from "../services/admin.service.js";
import { getTeachers } from "../services/admin.service.js";
import { getTeacherById } from "../services/admin.service.js";
import { updateTeacher } from "../services/admin.service.js";
import { deleteTeacher } from "../services/admin.service.js";
import {
    createStudent,
    createTeacher,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent
} from "../services/admin.service.js";









export const dashboard = asyncHandler(async (req, res) => {

    const statistics = await getDashboardStatistics();

    return res.status(200).json(
        new ApiResponse(
            200,
            statistics,
            "Dashboard data fetched successfully."
        )
    );

});

export const getTeachersHandler = asyncHandler(async (req, res) => {

    const data = await getTeachers(req.query);

    return res.status(200).json(
        new ApiResponse(
            200,
            data,
            "Teachers fetched successfully."
        )
    );

});

export const getTeacherByIdHandler = asyncHandler(async (req, res) => {

    const teacher = await getTeacherById(req.params.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            teacher,
            "Teacher fetched successfully."
        )
    );

});

export const updateTeacherHandler = asyncHandler(async (req, res) => {

    const teacher = await updateTeacher(
        req.params.id,
        req.body
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            teacher,
            "Teacher updated successfully."
        )
    );

});

export const deleteTeacherHandler = asyncHandler(async (req, res) => {

    const result = await deleteTeacher(req.params.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            result.message
        )
    );

});

export const createStudentHandler = asyncHandler(async (req, res) => {

    const student = await createStudent(req.body);

    return res.status(201).json(
        new ApiResponse(
            201,
            student,
            "Student created successfully."
        )
    );

});

export const getStudentsHandler = asyncHandler(async (req, res) => {

    const data = await getStudents(req.query);

    return res.status(200).json(
        new ApiResponse(
            200,
            data,
            "Students fetched successfully."
        )
    );

});

export const getStudentByIdHandler = asyncHandler(async (req, res) => {

    const student = await getStudentById(req.params.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            student,
            "Student fetched successfully."
        )
    );

});

export const createTeacherHandler = asyncHandler(async (req, res) => {

    const teacher = await createTeacher(req.body);

    return res.status(201).json(
        new ApiResponse(
            201,
            teacher,
            "Teacher created successfully."
        )
    );

});

export const updateStudentHandler = asyncHandler(async (req, res) => {

    const student = await updateStudent(
        req.params.id,
        req.body
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            student,
            "Student updated successfully."
        )
    );

});

export const deleteStudentHandler = asyncHandler(async (req, res) => {

    const result = await deleteStudent(req.params.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            result.message
        )
    );

});