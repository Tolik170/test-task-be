import { Router } from 'express'

import { asyncWrapper } from '../middlewares/asyncWrapper.js'
import { authController } from '../controllers/authController.js'

export const authRouter = Router()

authRouter.post('/sign-up', asyncWrapper(authController.SignUp))
authRouter.post('/sign-in', asyncWrapper(authController.SignIn))
authRouter.post('/logout', asyncWrapper(authController.Logout))
