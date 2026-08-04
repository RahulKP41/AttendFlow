import User from "../models/user.model.js";
import { verifyAccessToken } from "../utils/jwt.js";
import ApiError from "../utils/api-error.js";

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || "";
        const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

        if (!token) {
            throw new ApiError(401, "Authorization token is missing");
        }

        const decoded = verifyAccessToken(token);
        const user = await User.findById(decoded.id);

        if (!user) {
            throw new ApiError(401, "Invalid authorization token");
        }

        req.user = user;
        next();
    } catch (error) {
        if (error instanceof ApiError) {
            return next(error);
        }

        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return next(new ApiError(401, "Invalid or expired authorization token"));
        }

        next(error);
    }
};

export default authenticate;