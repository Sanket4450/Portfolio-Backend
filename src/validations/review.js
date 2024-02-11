import Joi from 'joi'

import {
    stringReqValidation,
    stringValidation,
    emailValidation,
} from './common.js'

const postReview = {
    body: Joi.object().keys({
        username: stringReqValidation,
        email: emailValidation,
        message: stringValidation.max(500),
    }),
}

export default {
    postReview,
}
