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
    '/:messageId',
    authorizeAdmin,
    validate(messageValidation.getFullMessage),
    messageController.getFullMessage
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

export { messageUserRouter, messageAdminRouter }
