import express from 'express'
import validate from '../middlewares/validate.js'
import { sessionValidation } from '../validations/index.js'
import { sessionController } from '../controllers/index.js'

const router = express.Router()

router.post(
    '/verify-secret',
    validate(sessionValidation.verifySecret),
    sessionController.verifySecret
)

router.get('/otp', sessionController.sendSessionLoginOtp)

router.post(
    '/verify-otp',
    validate(sessionValidation.verifySessionLoginOtp),
    sessionController.verifySessionLoginOtp
)

export default router
