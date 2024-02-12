import Joi from 'joi'

import {
    stringReqValidation,
    emailValidation,
    mobileValidation,
} from './common.js'

const postMessage = {
    body: Joi.object().keys({
        firstName: stringReqValidation,
        lastName: stringReqValidation,
        email: emailValidation,
        mobile: mobileValidation,
        subject: stringReqValidation.max(100),
        description: stringReqValidation.max(500),
    }),
}

export default {
    postMessage,
}
