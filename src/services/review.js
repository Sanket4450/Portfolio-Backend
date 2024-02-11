import httpStatus from 'http-status'
import Dbrepo from '../dbRepo.js'
import ApiError from '../utils/ApiError.js'
import constants from '../constants.js'

const getReviewsByEmail = async (email) => {
    const query = {
        email,
    }

    return Dbrepo.find(constants.COLLECTIONS.REVIEW, { query })
}

const addReview = async (reviewBody) => {
    try {
        const reviews = await getReviewsByEmail(reviewBody.email)

        if (reviews.length >= 10) {
            throw new ApiError(
                constants.MESSAGES.ERROR.MAX_REVIEW_LIMIT,
                httpStatus.BAD_REQUEST
            )
        }

        const data = {
            ...reviewBody,
        }

        Dbrepo.create(constants.COLLECTIONS.REVIEW, { data })
    } catch (error) {
        throw new ApiError(
            error.message || constants.MESSAGES.ERROR.SOMETHING_WENT_WRONG,
            error.statusCode || httpStatus.INTERNAL_SERVER_ERROR
        )
    }
}

export default {
    addReview,
}
