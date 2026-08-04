import mongoose from "mongoose";
import { ROLES } from "../constants/role.constants.js";
import { USER_STATUS } from "../constants/status.constants.js";

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },

        lastName: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            select: false   //does not return passwords.
        },

        role: {
            type: String,
            enum: Object.values(ROLES),
            required: true
        },

        status: {
            type: String,
            enum: Object.values(USER_STATUS),
            default: USER_STATUS.ACTIVE
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

export default User;