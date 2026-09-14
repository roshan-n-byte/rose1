import { Router } from 'express'
import { login, me, register } from '../controllers/authController.js'
import { requireAuth } from '../middleware/authMiddleware.js'
import { authSchema, validate } from '../middleware/validationMiddleware.js'
const router = Router()
router.post('/register', validate(authSchema), register)
router.post('/login', validate(authSchema.fork(['name', 'role'], (schema) => schema.optional())), login)
router.get('/me', requireAuth, me)
export default router
