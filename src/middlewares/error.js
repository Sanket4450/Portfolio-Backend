import mongoose from 'mongoose'
import httpStatus from 'http-status'
import ApiError from '../utils/ApiError.js'

export const errorConverter = (err, _, __, next) => {
    if (!(err instanceof ApiError)) {
        const statusCode =
            err.statusCode || err instanceof mongoose.Error
                ? httpStatus.BAD_REQUEST
                : httpStatus.INTERNAL_SERVER_ERROR
        const message = err.message || httpStatus[statusCode]
        err = new ApiError(message, statusCode, err.stack)
    }
    next(err)
}
export const errorHandler = (err, _, res, __) => {
    const { message, statusCode } = err

    const response = {
        success: false,
        code: statusCode,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    }

    res.status(statusCode).json(response)
}
