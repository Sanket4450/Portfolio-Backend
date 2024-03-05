import httpStatus from 'http-status'
import verifalia from '../config/verifalia.js'
import ApiError from '../utils/ApiError.js'
import constants from '../constants.js'

export const emailValidate = async (req, _, next) => {
    const { email } = req.body

    const result = await verifalia.emailValidations.submit(email)

    const entry = result.entries[0]

    if (entry.status !== 'Success') {
        throw new ApiError(constants.MESSAGES.ERROR.EMAIL_NOT_VALID, httpStatus.BAD_REQUEST)
    }
    next()
}
