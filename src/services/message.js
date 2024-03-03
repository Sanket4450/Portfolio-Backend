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

const getMessages = async ({ page, limit, sortBy }) => {
    try {
        page ||= 1
        limit ||= 20
        sortBy ||= 'newest'

        let sortQuery = {}

        const query = {}

        const data = {
            firstName: 1,
            lastName: 1,
            email: 1,
            isRead: 1,
            createdAt: 1,
        }

        switch (sortBy) {
            case 'newest':
                sortQuery = { createdAt: -1 }
                break

            case 'oldest':
                sortQuery = { createdAt: 1 }
                break

            case 'name_asc':
                sortQuery = { firstName: 1, createdAt: -1 }
                break

            case 'name_desc':
                sortQuery = { firstName: -1, createdAt: -1 }
                break

            case 'email_asc':
                sortQuery = { email: 1, createdAt: -1 }
                break

            case 'email_desc':
                sortQuery = { email: -1, createdAt: -1 }
                break

            case 'unread':
                sortQuery = { isRead: -1, createdAt: -1 }
                break

            default:
                sortQuery = { createdAt: -1 }
        }

        return Dbrepo.findPage(
            constants.COLLECTIONS.MESSAGE,
            { query, data },
            sortQuery,
            page,
            limit
        )
    } catch (error) {
        throw new ApiError(
            error.message || constants.MESSAGES.ERROR.SOMETHING_WENT_WRONG,
            error.statusCode || httpStatus.INTERNAL_SERVER_ERROR
        )
    }
}

export default {
    sendMessage,
    getMessages,
}
