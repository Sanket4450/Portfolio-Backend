import express from 'express'
import validate from '../middlewares/validate.js'
import { reviewValidation } from '../validations/index.js'
import { reviewController } from '../controllers/index.js'

const router = express.Router()

router.post(
    '/',
    validate(reviewValidation.postReview),
    reviewController.postReview
)

export default router
