import Joi from 'joi'

export const stringValidation = Joi.string().trim()
export const stringReqValidation = stringValidation.required()
export const emailValidation = stringReqValidation.email().lowercase()
export const passwordValidation = stringReqValidation.min(8)
export const numberValidation = Joi.number()
export const numberReqValidation = numberValidation.required()
export const integerNumberValidation = numberValidation.integer()
export const integerNumberReqValidation = integerNumberValidation.required()
export const booleanValidation = Joi.boolean()
export const booleanReqValidation = booleanValidation.required()
export const booleanStrictValidation = booleanValidation.strict()
export const booleanStrictReqValidation = booleanStrictValidation.required()
export const dateValidation = Joi.date()
export const dateReqValidation = Joi.date().required()
export const arrayValidation = Joi.array()
export const mobileValidation = numberValidation
    .min(10 ** 9)
    .max(10 ** 10 - 1)
    .messages({
        'number.min': 'Mobile number should be 10 digit',
        'number.max': 'Mobile number should be 10 digit',
    })
export const mobileReqValidation = mobileValidation.required()

export const secretValidation = stringReqValidation
    .pattern(new RegExp('^[A-Za-z0-9@$%&_]+$'))
    .messages({
        'string.pattern.base': 'Invalid admin secret ajsdfdasjf',
    })

export const otpValidation = integerNumberReqValidation
    .min(10 ** 5)
    .max(10 ** 6 - 1)
    .messages({
        'number.min': 'OTP should be 6 digit',
        'number.max': 'OTP should be 6 digit',
    })

export const idValidation = stringValidation
    .pattern(new RegExp('^[0-9a-fA-F]{24}$'))
    .messages({
        'string.pattern.base': 'Invalid ID. Please provide a valid ObjectId',
    })

export const idReqValidation = idValidation.required()

export const pageAndLimit = {
    page: integerNumberValidation.min(1),
    limit: integerNumberValidation.min(1),
}
