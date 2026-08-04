import asyncHandler from "../utils/async-handler.js";
import ApiResponse from "../utils/api-response.js";

import {
    createClass
} from "../services/class.service.js";

export const createClassHandler = asyncHandler(async (req, res) => {

    const newClass = await createClass(req.body);

    return res.status(201).json(
        new ApiResponse(
            201,
            newClass,
            "Class created successfully."
        )
    );

});