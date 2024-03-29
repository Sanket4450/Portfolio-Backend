import Joi from 'joi'

import {
    stringReqValidation,
    emailValidation,
    mobileValidation,
    pageAndLimit,
    stringValidation,
    idReqValidation,
    booleanReqValidation,
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

const getReplies = {
    query: Joi.object().keys({
        sortBy: stringValidation.lowercase().valid('newest', 'oldest'),
        ...pageAndLimit,
    }),
}

const getFullMessage = {
    params: Joi.object().keys({
        messageId: idReqValidation,
    }),
}

const replyMessage = {
    params: Joi.object().keys({
        messageId: idReqValidation,
    }),
    body: Joi.object().keys({
        subject: stringReqValidation.max(100),
        description: stringReqValidation.max(500),
    }),
}

const toggleRead = {
    params: Joi.object().keys({
        messageId: idReqValidation,
    }),
    query: Joi.object().keys({
        isRead: booleanReqValidation,
    }),
}

const deleteMessage = {
    params: Joi.object().keys({
        messageId: idReqValidation,
    }),
}

export default {
    postMessage,
    getMessages,
    getReplies,
    getFullMessage,
    replyMessage,
    toggleRead,
    deleteMessage,
}
