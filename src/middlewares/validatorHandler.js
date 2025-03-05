const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
    return (req, res, next) => {
        const data = req[property];
        const { error } = schema.validate(data, { abortEarly: false });

        if (error) {
            const errorDetails = error.details.map(err => ({
                message: err.message,
                path: err.path.join('.'), // Mejor representación del error
                type: err.type
            }));

            return next(boom.badRequest('Validation error', errorDetails));
        }
        next();
    };
}

module.exports = validatorHandler;