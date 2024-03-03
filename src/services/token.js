import jwt from 'jsonwebtoken'
import httpStatus from 'http-status'
import ApiError from '../utils/ApiError.js'
import constant from '../constants.js'
import sessionService from './session.js'

const generateToken = ({ payload, secret, options }) => {
    return jwt.sign(payload, secret, options)
}

const verifyToken = (token, secret) => {
    if (!token) {
        throw new ApiError(
            constant.MESSAGES.ERROR.TOKEN_IS_REQUIRED,
            httpStatus.FORBIDDEN
        )
    }
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                if (err.name === 'JsonWebTokenError') {
                    reject(
                        new ApiError(
                            constant.MESSAGES.ERROR.INVALID_TOKEN,
                            httpStatus.UNAUTHORIZED
                        )
                    )
                }
                if (err.name === 'TokenExpiredError') {
                    reject(
                        new ApiError(
                            constant.MESSAGES.ERROR.TOKEN_EXPIRED,
                            httpStatus.UNAUTHORIZED
                        )
                    )
                }
                reject(new ApiError(err.message, httpStatus.UNAUTHORIZED))
            } else {
                resolve(decoded)
            }
        })
    })
}

const generateAccessToken = async () => {
    const payload = {
        role: 'admin',
    }

    const accessToken = generateToken({
        payload,
        secret: process.env.ACCESS_TOKEN_SECRET,
        options: {},
    })

    await sessionService.createSession(accessToken)

    return accessToken
}

export default {
    generateToken,
    verifyToken,
    generateAccessToken,
}
