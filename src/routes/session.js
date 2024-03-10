import express from 'express'
import validate from '../middlewares/validate.js'
import { sessionValidation } from '../validations/index.js'
import { sessionController } from '../controllers/index.js'

const router = express.Router()

router.post(
    '/otp',
    sessionController.sendSessionLoginOtp
)

router.post(
    '/',
    validate(sessionValidation.loginSession),
    sessionController.loginSession
)

export default router
