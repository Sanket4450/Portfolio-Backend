import httpStatus from 'http-status'
import constants from '../constants.js'
import catchAsyncErrors from '../utils/catchAsyncErrors.js'
import sendResponse from '../utils/responseHandler.js'
import { sessionService, tokenService } from '../services/index.js'

const loginSession = catchAsyncErrors(async (req, res) => {
    const { secret } = req.body

    sessionService.validateSecret(secret)

    const accessToken = await tokenService.generateAccessToken()

    return sendResponse(
        res,
        httpStatus.OK,
        { accessToken },
        constants.MESSAGES.SUCCESS.SESSION_LOGIN
    )
})

export default {
    loginSession,
}
