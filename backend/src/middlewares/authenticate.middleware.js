import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/api-error.js";
import config from "../config/environment.js";

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return next(new ApiError(401, "Access token is required."));
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, config.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return next(new ApiError(401, "User not found."));
        }

        req.user = user;

        next();

    } catch (error) {
        next(new ApiError(401, "Invalid or expired token."));
    }
};

export default authenticate;