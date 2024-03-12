import express from 'express'
import validate from '../middlewares/validate.js'
import { authorizeAdmin } from '../middlewares/auth.js'
import { messageValidation } from '../validations/index.js'
import { messageController } from '../controllers/index.js'

const messageUserRouter = express.Router()
const messageAdminRouter = express.Router()

messageUserRouter.post(
    '/',
    validate(messageValidation.postMessage),
    messageController.postMessage
)

messageAdminRouter.get(
    '/',
    authorizeAdmin,
    validate(messageValidation.getMessages),
    messageController.getMessages
)

messageAdminRouter.get(
    '/replies',
    authorizeAdmin,
    validate(messageValidation.getReplies),
    messageController.getReplies
)

messageAdminRouter.get(
    '/:messageId',
    authorizeAdmin,
    validate(messageValidation.getFullMessage),
    messageController.getFullMessage
)

messageAdminRouter.post(
    '/:messageId/reply',
    authorizeAdmin,
    validate(messageValidation.replyMessage),
    messageController.replyMessage
)

messageAdminRouter.patch(
    '/mark-all-as-read',
    authorizeAdmin,
    messageController.markAllAsRead
)

messageAdminRouter.patch(
    '/:messageId',
    authorizeAdmin,
    validate(messageValidation.toggleRead),
    messageController.toggleRead
)

messageAdminRouter.delete(
    '/:messageId',
    authorizeAdmin,
    validate(messageValidation.deleteMessage),
    messageController.deleteMessage
)

export { messageUserRouter, messageAdminRouter }
