import Joi from 'joi'

import { otpValidation, secretValidation } from './common.js'

const verifySecret = {
    body: Joi.object().keys({
        secret: secretValidation,
    }),
}

const verifySessionLoginOtp = {
    body: Joi.object().keys({
        otp: otpValidation,
    }),
}

export default {
    verifySecret,
    verifySessionLoginOtp,
}
