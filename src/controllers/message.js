import httpStatus from 'http-status'
import constants from '../constants.js'
import catchAsyncErrors from '../utils/catchAsyncErrors.js'
import ApiError from '../utils/ApiError.js'
import sendResponse from '../utils/responseHandler.js'
import { messageService } from '../services/index.js'

const postMessage = catchAsyncErrors(async (req, res) => {
    await messageService.sendMessage(req.body)

    return sendResponse(
        res,
        httpStatus.OK,
        {},
        constants.MESSAGES.SUCCESS.MESSAGE_SENT
    )
})

const getMessages = catchAsyncErrors(async (req, res) => {
    const messageObjects = await messageService.getMessages(req.query)

    const messages = messageObjects.map((message) => ({
        messageId: message._id,
        firstName: message.firstName,
        lastName: message.lastName,
        email: message.email,
        isRead: message.isRead,
        receivedAt: message.createdAt,
    }))

    return sendResponse(
        res,
        httpStatus.OK,
        { messages },
        constants.MESSAGES.SUCCESS.MESSAGES_FETCHED
    )
})

const getFullMessage = catchAsyncErrors(async (req, res) => {
    const { messageId } = req.params

    const messageObject = await messageService.getFullMessage(messageId)

    if (!messageObject) {
        throw new ApiError(
            constants.MESSAGES.ERROR.MESSAGE_NOT_FOUND,
            httpStatus.NOT_FOUND
        )
    }

    const message = {
        messageId: messageObject._id,
        firstName: messageObject.firstName,
        lastName: messageObject.lastName,
        email: messageObject.email,
        mobile: messageObject.mobile,
        subject: messageObject.subject,
        description: messageObject.description,
        isRead: messageObject.isRead,
        receivedAt: messageObject.createdAt,
    }

    return sendResponse(
        res,
        httpStatus.OK,
        { message },
        constants.MESSAGES.SUCCESS.MESSAGE_FETCHED
    )
})

const markAllAsRead = catchAsyncErrors(async (_, res) => {
    await messageService.markAllMessagesAsRead()

    return sendResponse(
        res,
        httpStatus.OK,
        {},
        constants.MESSAGES.SUCCESS.MARKED_ALL_AS_READ
    )
})

const toggleRead = catchAsyncErrors(async (req, res) => {
    const { messageId } = req.params
    const { isRead } = req.query

    await messageService.toggleRead(messageId, isRead)

    return sendResponse(
        res,
        httpStatus.OK,
        { isRead },
        `Message ${isRead ? 'marked as read' : 'marked as unread'}`
    )
})

export default {
    postMessage,
    getMessages,
    getFullMessage,
    markAllAsRead,
    toggleRead,
}
