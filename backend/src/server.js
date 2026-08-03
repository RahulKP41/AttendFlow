import app from "./app.js";

import config from "./config/environment.js";

import {
    connectDatabase,
    disconnectDatabase
} from "./config/database.js";

async function startServer() {

    await connectDatabase();

    const server = app.listen(config.app.port, () => {

        console.log("");

        console.log("===================================");

        console.log(`${config.app.name}`);

        console.log(`Environment : ${config.app.env}`);

        console.log(`Port        : ${config.app.port}`);

        console.log(`API Version : ${config.app.apiVersion}`);

        console.log("===================================");

    });

    const gracefulShutdown = async () => {

        console.log("\nShutting down server...");

        server.close(async () => {

            await disconnectDatabase();

            process.exit(0);

        });

    };

    process.on("SIGINT", gracefulShutdown);

    process.on("SIGTERM", gracefulShutdown);

}

startServer();