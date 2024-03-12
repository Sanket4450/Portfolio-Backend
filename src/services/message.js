import httpStatus from 'http-status'
import mongoose from 'mongoose'
import Dbrepo from '../dbRepo.js'
import ApiError from '../utils/ApiError.js'
import constants from '../constants.js'
import emailService from './email.js'

const getMessagesByEmail = async (email) => {
    const query = {
        email,
    }

    return Dbrepo.find(constants.COLLECTIONS.MESSAGE, { query })
}

const getMessageById = async (id) => {
    const query = {
        _id: new mongoose.Types.ObjectId(id),
    }

    const data = {
        _id: 1,
    }

    return Dbrepo.findOne(constants.COLLECTIONS.MESSAGE, { query, data })
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

const getFullMessage = async (id) => {
    try {
        const query = {
            _id: new mongoose.Types.ObjectId(id),
        }

        const data = {
            firstName: 1,
            lastName: 1,
            email: 1,
            mobile: 1,
            subject: 1,
            description: 1,
            isRead: 1,
            createdAt: 1,
        }

        return Dbrepo.findOne(constants.COLLECTIONS.MESSAGE, { query, data })
    } catch (error) {
        throw new ApiError(
            error.message || constants.MESSAGES.ERROR.SOMETHING_WENT_WRONG,
            error.statusCode || httpStatus.INTERNAL_SERVER_ERROR
        )
    }
}

const replyMessage = async (id, { subject, description }) => {
    try {
        const { firstName, lastName, email } = await getFullMessage(id)

        const templateData = {
            firstName,
            lastName,
            subject,
            description,
        }

        await emailService.validateEmail(email)

        await emailService.sendReplyMessage(email, templateData)

        const data = {
            messageId: new mongoose.Types.ObjectId(id),
            subject,
            description,
        }

        await Dbrepo.create(constants.COLLECTIONS.REPLY, { data })
    } catch (error) {
        throw new ApiError(
            error.message || constants.MESSAGES.ERROR.SOMETHING_WENT_WRONG,
            error.statusCode || httpStatus.INTERNAL_SERVER_ERROR
        )
    }
}

const getReplies = async ({ page, limit, sortBy }) => {
    try {
        page ||= 1
        limit ||= 20
        sortBy ||= 'newest'

        let sortQuery = {}

        const query = {}

        const data = {
            subject: 1,
            description: 1,
            createdAt: 1,
        }

        switch (sortBy) {
            case 'newest':
                sortQuery = { createdAt: -1 }
                break

            case 'oldest':
                sortQuery = { createdAt: 1 }
                break

            default:
                sortQuery = { createdAt: -1 }
        }

        return Dbrepo.findPage(
            constants.COLLECTIONS.REPLY,
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

const toggleRead = async (messageId, isRead) => {
    try {
        const query = {
            _id: new mongoose.Types.ObjectId(messageId),
            isRead: !isRead,
        }

        const data = {
            $set: {
                isRead,
            },
        }

        await Dbrepo.updateOne(constants.COLLECTIONS.MESSAGE, { query, data })
    } catch (error) {
        throw new ApiError(
            error.message || constants.MESSAGES.ERROR.SOMETHING_WENT_WRONG,
            error.statusCode || httpStatus.INTERNAL_SERVER_ERROR
        )
    }
}

const markAllMessagesAsRead = async () => {
    try {
        const query = {
            isRead: false,
        }

        const data = {
            $set: {
                isRead: true,
            },
        }

        await Dbrepo.updateMany(constants.COLLECTIONS.MESSAGE, { query, data })
    } catch (error) {
        throw new ApiError(
            error.message || constants.MESSAGES.ERROR.SOMETHING_WENT_WRONG,
            error.statusCode || httpStatus.INTERNAL_SERVER_ERROR
        )
    }
}

const deleteMessage = async (id) => {
    try {
        const query = {
            _id: new mongoose.Types.ObjectId(id),
        }

        await Dbrepo.deleteOne(constants.COLLECTIONS.MESSAGE, { query })
    } catch (error) {
        throw new ApiError(
            error.message || constants.MESSAGES.ERROR.SOMETHING_WENT_WRONG,
            error.statusCode || httpStatus.INTERNAL_SERVER_ERROR
        )
    }
}

export default {
    sendMessage,
    getMessageById,
    getMessages,
    getReplies,
    getFullMessage,
    replyMessage,
    toggleRead,
    markAllMessagesAsRead,
    deleteMessage,
}
