import mongoose from "mongoose";
import config from "./environment.js";

export async function connectDatabase() {
    try {

        await mongoose.connect(config.database.uri);

        console.log("MongoDB connected successfully");

    } catch (error) {

        console.error("MongoDB connection failed");

        console.error(error.message);

        process.exit(1);
    }
}

export async function disconnectDatabase() {

    await mongoose.connection.close();

    console.log("MongoDB connection closed");
}