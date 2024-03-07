import express from 'express'
import { messageUserRouter, messageAdminRouter } from './message.js'
import sessionRouter from './session.js'
import rootRouter from './root.js'
import testRouter from './test.js'

const userRouter = express.Router()
const adminRouter = express.Router()

userRouter.use('/messages', messageUserRouter)
userRouter.use('/test', testRouter)

adminRouter.use('/', rootRouter)
adminRouter.use('/session', sessionRouter)
adminRouter.use('/messages', messageAdminRouter)

export { userRouter, adminRouter }
