import path from 'path'
import httpStatus from 'http-status'
import constants from '../constants.js'
import ApiError from '../utils/ApiError.js'
import { sendMail } from '../utils/emailConfig.js'

const sendReplyMessage = async (email, data) => {
    try {
        const templateFile = path.join(process.cwd(), 'src/views/replyMessage.ejs')

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
    sendReplyMessage,
}
