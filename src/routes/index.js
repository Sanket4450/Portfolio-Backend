import express from 'express'
import reviewRoutes from './review.js'

const router = express.Router()

router.use('/reviews', reviewRoutes)

export default router
