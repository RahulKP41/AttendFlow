const validate = (schema) => {
    return async (req, res, next) => {
        try {
            req.validatedData = await schema.parseAsync({
                body: req.body,
                params: req.params,
                query: req.query,
            });

            next();
        } catch (error) {
            if (error.name === "ZodError") {
                return res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    errors: error.issues.map((issue) => ({
                        field: issue.path.join("."),
                        message: issue.message,
                    })),
                });
            }

            next(error);
        }
    };
};

export default validate;