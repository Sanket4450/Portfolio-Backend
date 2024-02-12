import httpStatus from 'http-status'
import Dbrepo from '../dbRepo.js'
import ApiError from '../utils/ApiError.js'
import constants from '../constants.js'

const getMessagesByEmail = async (email) => {
    const query = {
        email,
    }

    return Dbrepo.find(constants.COLLECTIONS.MESSAGE, { query })
}

const sendMessage = async (messageBody) => {
    try {
        const reviews = await getMessagesByEmail(messageBody.email)

        if (reviews.length >= 10) {
            throw new ApiError(
                constants.MESSAGES.ERROR.MAX_MESSAGE_LIMIT,
                httpStatus.BAD_REQUEST
            )
        }

        const data = {
            ...messageBody,
        }

        Dbrepo.create(constants.COLLECTIONS.MESSAGE, { data })
    } catch (error) {
        throw new ApiError(
            error.message || constants.MESSAGES.ERROR.SOMETHING_WENT_WRONG,
            error.statusCode || httpStatus.INTERNAL_SERVER_ERROR
        )
    }
}

export default {
    sendMessage,
}
