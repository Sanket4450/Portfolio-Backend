import httpStatus from 'http-status'
import constants from '../constants.js'
import catchAsyncErrors from '../utils/catchAsyncErrors.js'
import sendResponse from '../utils/responseHandler.js'
import { sessionService, tokenService } from '../services/index.js'

const verifySecret = catchAsyncErrors(async (req, res) => {
    const { secret } = req.body

    sessionService.validateSecret(secret)

    return sendResponse(
        res,
        httpStatus.OK,
        {},
        constants.MESSAGES.SUCCESS.SECRET_VERIFIED
    )
})

const sendSessionLoginOtp = catchAsyncErrors(async (_, res) => {
    await sessionService.sendSessionLoginOtp()

    return sendResponse(
        res,
        httpStatus.OK,
        {},
        constants.MESSAGES.SUCCESS.OTP_SENT
    )
})

const verifySessionLoginOtp = catchAsyncErrors(async (req, res) => {
    const { otp } = req.body
    await sessionService.verifySessionLoginOtp(otp)

    const accessToken = await tokenService.generateAccessToken()

    return sendResponse(
        res,
        httpStatus.OK,
        { accessToken },
        constants.MESSAGES.SUCCESS.OTP_VERIFIED
    )
})

export default {
    verifySecret,
    sendSessionLoginOtp,
    verifySessionLoginOtp,
}
