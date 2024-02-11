import Joi from 'joi'

export const stringValidation = Joi.string().trim()
export const stringReqValidation = stringValidation.required()
export const emailValidation = stringReqValidation.email().lowercase()
export const passwordValidation = stringReqValidation.min(8)
export const numberValidation = Joi.number()
export const numberReqValidation = numberValidation.required()
export const integerNumberValidation = numberValidation.integer()
export const integerNumberReqValidation = integerNumberValidation.required()
export const booleanValidation = Joi.boolean().strict()
export const booleanReqValidation = booleanValidation.required()
export const dateValidation = Joi.date()
export const dateReqValidation = Joi.date().required()
export const arrayValidation = Joi.array()

export const pageAndLimit = {
    page: integerNumberValidation.min(1),
    limit: integerNumberValidation.min(1),
}
