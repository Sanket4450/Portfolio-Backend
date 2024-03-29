import joi from 'joi'
import httpStatus from 'http-status'
import pick from '../utils/pick.js'
import ApiError from '../utils/ApiError.js'

const schemaOptions = {
    errors: {
        wrap: {
            label: '',
        },
    },
}

const validate = (schema) => (req, res, next) => {
    const validSchema = pick(schema, ['query', 'params', 'body'])
    const object = pick(req, Object.keys(validSchema))
    const { value, error } = joi
        .compile(validSchema)
        .prefs({ errors: { label: 'key' }, abortEarly: false })
        .validate(object, schemaOptions)

    if (error) {
        const errorMessage = error.details[0].message
        return next(new ApiError(errorMessage, httpStatus.BAD_REQUEST))
    }
    Object.assign(req, value)
    return next()
}

export default validate
