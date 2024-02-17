import express from 'express'
import messageRoutes from './message.js'
import testRoutes from './test.js'

const router = express.Router()

router.use('/messages', messageRoutes)
router.use('/test', testRoutes)

export default router
