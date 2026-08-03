import asyncHandler from "../utils/async-handler.js";
import { loginUser } from "../services/auth.service.js";

export const login = asyncHandler(async (req, res) => {
    const response = await loginUser(req.body);

    return res
        .status(response.statusCode)
        .json(response);
});

export const me = asyncHandler(async (req, res) => {
    const user = req.user.toObject();

    delete user.password;

    return res.status(200).json({
        success: true,
        message: "Current user fetched successfully",
        data: user
    });
});