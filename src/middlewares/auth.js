import { sessionService, tokenService } from '../services/index.js'

export const authorizeAdmin = async (req, _, next) => {
    try {
        const token =
            req.headers && req.headers.authorization
                ? req.headers.authorization.split(' ')[1]
                : ''
        await tokenService.verifyToken(token, process.env.ACCESS_TOKEN_SECRET)
        await sessionService.validateSessionToken(token)

        next()
    } catch (error) {
        next(error)
    }
}
