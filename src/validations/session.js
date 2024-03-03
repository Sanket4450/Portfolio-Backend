import Joi from 'joi'

import { secretValidation } from './common.js'

const loginSession = {
    body: Joi.object().keys({
        secret: secretValidation,
    }),
}

export default {
    loginSession,
}
