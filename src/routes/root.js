import express from 'express'
import { authorizeAdmin } from '../middlewares/auth.js'
import { rootController } from '../controllers/index.js'

const router = express.Router()

router.get('/', authorizeAdmin, rootController.getRootData)

export default router
