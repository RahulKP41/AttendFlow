import dotenv from "dotenv";

dotenv.config();

const requiredVariables = [
    "PORT",
    "MONGODB_URI",
    "JWT_SECRET"
];

for (const variable of requiredVariables) {
    if (!process.env[variable]) {
        throw new Error(`Missing required environment variable: ${variable}`);
    }
}

const config = {
    app: {
        name: process.env.APP_NAME || "AttendFlow",
        slug: process.env.APP_SLUG || "attendflow",
        env: process.env.NODE_ENV || "development",
        port: Number(process.env.PORT),
        apiVersion: process.env.API_VERSION || "v1"
    },

    database: {
        uri: process.env.MONGODB_URI
    },

    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || "1h"
    },

    bcrypt: {
        saltRounds: Number(process.env.BCRYPT_SALT_ROUNDS || 12)
    },

    client: {
        url: process.env.CLIENT_URL
    }
};

export default config;