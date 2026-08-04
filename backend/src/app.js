import express from "express";
import routes from "./routes/index.js";
import config from "./config/environment.js";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/error.middleware.js";
import ApiError from "./utils/api-error.js";


const app = express();

/*
|--------------------------------------------------------------------------
| Security
|--------------------------------------------------------------------------
*/

app.use(helmet());

app.use(cors({
    origin: config.client.url,
    credentials: true
}));

/*
|--------------------------------------------------------------------------
| Parsers
|--------------------------------------------------------------------------
*/

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(cookieParser());

app.use(compression());

/*
|--------------------------------------------------------------------------
| Logging
|--------------------------------------------------------------------------
*/

app.use(morgan("dev"));

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get("/health", (req, res) => {

    res.status(200).json({

        success: true,

        application: config.app.name,

        environment: config.app.env,

        status: "UP",

        timestamp: new Date().toISOString()

    });

});

/*
|--------------------------------------------------------------------------
| API Root
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {

    res.json({

        success: true,

        message: `${config.app.name} API is running`

    });

});

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

app.use(`/api/${config.app.apiVersion}`, routes);

/*
|--------------------------------------------------------------------------
| 404 Handler
|--------------------------------------------------------------------------
*/

app.use((req, res, next) => {
    next(new ApiError(404, "Route not found"));
});

app.use(errorHandler);

export default app;