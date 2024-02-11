import httpStatus from 'http-status'
import constants from '../constants.js'
import catchAsyncErrors from '../utils/catchAsyncErrors.js'
import sendResponse from '../utils/responseHandler.js'
import { reviewService } from '../services/index.js'

const postReview = catchAsyncErrors(async (req, res) => {
    await reviewService.addReview(req.body)

    return sendResponse(
        res,
        httpStatus.OK,
        {},
        constants.MESSAGES.SUCCESS.REVIEW_POSTED
    )
})

export default {
    postReview,
}
