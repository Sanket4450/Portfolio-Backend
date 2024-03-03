import httpStatus from 'http-status'
import Dbrepo from '../dbRepo.js'
import ApiError from '../utils/ApiError.js'
import constants from '../constants.js'

const validateSecret = (secret) => {
    if (secret !== process.env.ADMIN_SECRET) {
        throw new ApiError(
            constants.MESSAGES.ERROR.INVALID_SECRET,
            httpStatus.FORBIDDEN
        )
    }
}

const createSession = async (token) => {
    try {
        const data = {
            token,
        }

        Dbrepo.create(constants.COLLECTIONS.SESSION, { data })
    } catch (error) {
        throw new ApiError(
            error.message || constants.MESSAGES.ERROR.SOMETHING_WENT_WRONG,
            error.statusCode || httpStatus.INTERNAL_SERVER_ERROR
        )
    }
}

const addTimestamp = async (token) => {
    try {
        const query = {
            token,
        }

        const data = {
            $set: {
                lastActiveAt: Date.now(),
            },
        }

        await Dbrepo.updateOne(constants.COLLECTIONS.SESSION, { query, data })
    } catch (error) {
        throw new ApiError(
            error.message || constants.MESSAGES.ERROR.SOMETHING_WENT_WRONG,
            error.statusCode || httpStatus.INTERNAL_SERVER_ERROR
        )
    }
}

const validateSessionToken = async (token) => {
    try {
        const query = {
            token,
        }

        const session = await Dbrepo.findOne(constants.COLLECTIONS.SESSION, {
            query,
        })

        if (!session) {
            throw new ApiError(
                constants.MESSAGES.ERROR.INVALID_TOKEN,
                httpStatus.UNAUTHORIZED
            )
        }

        await addTimestamp(token)
    } catch (error) {
        throw new ApiError(
            error.message || constants.MESSAGES.ERROR.SOMETHING_WENT_WRONG,
            error.statusCode || httpStatus.INTERNAL_SERVER_ERROR
        )
    }
}

export default {
    validateSecret,
    createSession,
    validateSessionToken,
}
