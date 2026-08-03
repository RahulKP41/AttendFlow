import User from "../models/user.model.js";
import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import { comparePassword } from "../utils/password.js";
import { generateAccessToken } from "../utils/jwt.js";
import { USER_STATUS } from "../constants/status.constants.js";

export const loginUser = async ({ email, password }) => {

    // Find user including password
    const user = await User.findOne({
        email: email.toLowerCase()
    }).select("+password");

    if (!user) {
        throw new ApiError(
            401,
            "Invalid email or password"
        );
    }

    // Compare password
    const passwordMatched = await comparePassword(
        password,
        user.password
    );

    if (!passwordMatched) {
        throw new ApiError(
            401,
            "Invalid email or password"
        );
    }

    // Check account status
    if (user.status !== USER_STATUS.ACTIVE) {
        throw new ApiError(
            403,
            "Your account has been deactivated."
        );
    }

    // Generate JWT
    const accessToken = generateAccessToken({
        id: user._id,
        role: user.role
    });

    // Remove password before sending response
    const userObject = user.toObject();

    delete userObject.password;

    return new ApiResponse(
        200,
        {
            accessToken,
            user: userObject
        },
        "Login successful"
    );

};