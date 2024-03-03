import Joi from 'joi'

import {
    stringReqValidation,
    emailValidation,
    mobileValidation,
    pageAndLimit,
    stringValidation,
    idReqValidation,
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

const getMessages = {
    query: Joi.object().keys({
        sortBy: stringValidation
            .lowercase()
            .valid(
                'newest',
                'oldest',
                'name_asc',
                'name_desc',
                'email_asc',
                'email_desc',
                'unread'
            ),
        ...pageAndLimit,
    }),
}

const getFullMessage = {
    params: Joi.object().keys({
        messageId: idReqValidation, 
    }),
}

export default {
    postMessage,
    getMessages,
    getFullMessage,
}
