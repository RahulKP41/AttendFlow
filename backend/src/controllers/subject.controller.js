import asyncHandler from "../utils/async-handler.js";
import ApiResponse from "../utils/api-response.js";

import {
    createSubject,
    getSubjects,
    getSubjectById,
    updateSubject,
    deleteSubject
} from "../services/subject.service.js";

export const createSubjectHandler = asyncHandler(async (req, res) => {

    const subject = await createSubject(req.body);

    return res.status(201).json(
        new ApiResponse(
            201,
            subject,
            "Subject created successfully."
        )
    );

});

export const getSubjectsHandler = asyncHandler(async (req, res) => {

    const subjects = await getSubjects(req.query);

    return res.status(200).json(
        new ApiResponse(
            200,
            subjects,
            "Subjects fetched successfully."
        )
    );

});

export const getSubjectByIdHandler = asyncHandler(async (req, res) => {

    const subject = await getSubjectById(req.params.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            subject,
            "Subject fetched successfully."
        )
    );

});

export const updateSubjectHandler = asyncHandler(async (req, res) => {

    const subject = await updateSubject(
        req.params.id,
        req.body
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            subject,
            "Subject updated successfully."
        )
    );

});

export const deleteSubjectHandler = asyncHandler(async (req, res) => {

    const result = await deleteSubject(req.params.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            result.message
        )
    );

});