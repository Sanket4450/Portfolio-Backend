import path from 'path'
import httpStatus from 'http-status'
import verifalia from '../config/verifalia.js'
import constants from '../constants.js'
import ApiError from '../utils/ApiError.js'
import { sendMail } from '../utils/emailConfig.js'

const validateEmail = async (email) => {
    const result = await verifalia.emailValidations.submit(email)

    const entry = result.entries[0]

    if (entry.classification !== 'Deliverable') {
        throw new ApiError(
            constants.MESSAGES.ERROR.EMAIL_NOT_VALID,
            httpStatus.BAD_REQUEST
        )
    }
}

const sendSessionLoginOtp = async (adminEmail, data) => {
    try {
        const templateFile = path.join(
            process.cwd(),
            'src/views/sessionLoginOtp.ejs'
        )

        sendMail({
            email: adminEmail,
            subject: constants.MESSAGES.SUCCESS.SESSION_LOGIN_OTP,
            templateFile,
            data,
        })
    } catch (error) {
        throw new ApiError(
            constants.MESSAGES.SOMETHING_WENT_WRONG,
            httpStatus.INTERNAL_SERVER_ERROR
        )
    }
}

const sendReplyMessage = async (email, data) => {
    try {
        const templateFile = path.join(
            process.cwd(),
            'src/views/replyMessage.ejs'
        )

        sendMail({
            email,
            subject: constants.MESSAGES.SUCCESS.REPLY_MESSAGE,
            templateFile,
            data,
        })
    } catch (error) {
        throw new ApiError(
            constants.MESSAGES.SOMETHING_WENT_WRONG,
            httpStatus.INTERNAL_SERVER_ERROR
        )
    }
}

export default {
    validateEmail,
    sendSessionLoginOtp,
    sendReplyMessage,
}
