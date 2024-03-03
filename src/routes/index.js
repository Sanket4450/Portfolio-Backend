import express from 'express'
import messageRoutes from './message.js'
import sessionRoutes from './session.js'
import testRoutes from './test.js'

const userRouter = express.Router()
const adminRouter = express.Router()

userRouter.use('/messages', messageRoutes)
userRouter.use('/test', testRoutes)

adminRouter.use('/session', sessionRoutes)

export { userRouter, adminRouter }
