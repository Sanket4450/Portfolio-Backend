import express from 'express'
import messageRoutes from './message.js'

const router = express.Router()

router.use('/messages', messageRoutes)

export default router
