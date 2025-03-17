
export function errorHandlerMiddle(err, req, res, next) {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
}

export function errorHandler(err, req, res, next) {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode
    let message = err.message;

    // Check for Mongoose bad ObjectId
    if(err.name === 'CastError' && err.kind === 'ObjectId') {
        message = `Resource not found`;
        statusCode = 404;
    }

    res.status(statusCode)
    res.json ({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })

}

export function notFound(req, res, next) {
    const error = new Error(`Not Found: ${req.originalUrl}`);
    res.status(404);
    next(error);
}

