import httpStatus from 'http-status'
import constants from '../constants.js'
import catchAsyncErrors from '../utils/catchAsyncErrors.js'
import sendResponse from '../utils/responseHandler.js'

const testHandler = catchAsyncErrors(async (req, res) => {
    return sendResponse(
        res,
        httpStatus.OK,
        {},
        constants.MESSAGES.SUCCESS.TEST_SUCCESS
    )
})

export default {
    testHandler,
}
