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

export default {
    postMessage,
}
