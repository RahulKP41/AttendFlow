import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "../src/models/user.model.js";
import { hashPassword } from "../src/utils/password.js";
import { ROLES } from "../src/constants/role.constants.js";
import { USER_STATUS } from "../src/constants/status.constants.js";

dotenv.config();

async function createAdmin() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const existingAdmin = await User.findOne({
            role: ROLES.ADMIN
        });

        if (existingAdmin) {
            console.log("Admin already exists.");
            process.exit(0);
        }

        const admin = await User.create({
            firstName: "System",
            lastName: "Administrator",
            email: "admin@attendflow.com",
            password: await hashPassword("Admin@123"),
            role: ROLES.ADMIN,
            status: USER_STATUS.ACTIVE
        });

        console.log("====================================");
        console.log("Admin created successfully!");
        console.log("Email    : admin@attendflow.com");
        console.log("Password : Admin@123");
        console.log("User ID  :", admin._id.toString());
        console.log("====================================");

        process.exit(0);

    } catch (error) {
        console.error("Failed to create admin.");
        console.error(error);
        process.exit(1);
    }
}

createAdmin();