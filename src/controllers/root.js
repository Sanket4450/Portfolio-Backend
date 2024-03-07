import httpStatus from 'http-status'
import constants from '../constants.js'
import catchAsyncErrors from '../utils/catchAsyncErrors.js'
import sendResponse from '../utils/responseHandler.js'
import { rootService } from '../services/index.js'

const getRootData = catchAsyncErrors(async (req, res) => {
    const rootData = await rootService.getRootData()

    return sendResponse(
        res,
        httpStatus.OK,
        { ...rootData },
        constants.MESSAGES.SUCCESS.ROOT_DATA_FETCHED
    )
})

export default {
    getRootData,
}
