import ApiError from "../utils/api-error.js";

const validate = (schema) => (req, res, next) => {
    const payload = {
        body: req.body,
        query: req.query,
        params: req.params,
        headers: req.headers
    };

    const result = schema.safeParse(payload);

    if (!result.success) {
        const issue = result.error.issues[0];
        const message = issue?.message || "Validation failed";

        return next(new ApiError(400, message));
    }

    if (result.data.body !== undefined) {
        req.body = result.data.body;
    }

    if (result.data.query !== undefined) {
        req.query = result.data.query;
    }

    if (result.data.params !== undefined) {
        req.params = result.data.params;
    }

    return next();
};

export default validate;
