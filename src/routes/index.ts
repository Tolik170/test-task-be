import { Router } from 'express'
import { authRouter } from './authRouter.js'
import { messageRouter } from './messageRouter.js'

export const router = Router()

router.use('/auth', authRouter)
router.use('/message', messageRouter)
