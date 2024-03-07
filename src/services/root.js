import httpStatus from 'http-status'
import Dbrepo from '../dbRepo.js'
import ApiError from '../utils/ApiError.js'
import constants from '../constants.js'

const getRootData = async () => {
    try {
        const messagesCount = await Dbrepo.findCount(
            constants.COLLECTIONS.MESSAGE,
            { query: {} }
        )

        const unreadMessagesCount = await Dbrepo.findCount(
            constants.COLLECTIONS.MESSAGE,
            { query: { isRead: false } }
        )

        const readMessagesCount = await Dbrepo.findCount(
            constants.COLLECTIONS.MESSAGE,
            { query: { isRead: true } }
        )

        const repliesCount = await Dbrepo.findCount(
            constants.COLLECTIONS.REPLY,
            { query: {} }
        )

        return {
            messagesCount,
            unreadMessagesCount,
            readMessagesCount,
            repliesCount,
        }
    } catch (error) {
        throw new ApiError(
            error.message || constants.MESSAGES.ERROR.SOMETHING_WENT_WRONG,
            error.statusCode || httpStatus.INTERNAL_SERVER_ERROR
        )
    }
}

export default {
    getRootData,
}
