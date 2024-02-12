import express from 'express'
import validate from '../middlewares/validate.js'
import { messageValidation } from '../validations/index.js'
import { messageController } from '../controllers/index.js'

const router = express.Router()

router.post(
    '/',
    validate(messageValidation.postMessage),
    messageController.postMessage
)

export default router
