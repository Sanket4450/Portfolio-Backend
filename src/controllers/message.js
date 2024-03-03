import httpStatus from 'http-status'
import constants from '../constants.js'
import catchAsyncErrors from '../utils/catchAsyncErrors.js'
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
        id: message._id,
        firstName: message.firstName,
        lastName: message.lastName,
        email: message.email,
        isRead: message.isRead,
        createdAt: message.createdAt,
    }))

    return sendResponse(
        res,
        httpStatus.OK,
        { messages },
        constants.MESSAGES.SUCCESS.MESSAGE_SENT
    )
})

export default {
    postMessage,
    getMessages,
}
