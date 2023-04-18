import { Router } from 'express'

import { asyncWrapper } from '../middlewares/asyncWrapper.js'
import { authMiddleware } from '../middlewares/auth.js'
import { messageController } from '../controllers/messageController.js'

export const messageRouter = Router()

messageRouter.use(authMiddleware)

messageRouter.post('/add-message', asyncWrapper(messageController.addMessage))
messageRouter.get('/get-messages/:userId', asyncWrapper(messageController.getMessagesByUserId))
messageRouter.patch('/update-messages/:id', asyncWrapper(messageController.updateMessage))
messageRouter.delete('/delete-messages/:userId', asyncWrapper(messageController.deleteMessagesByUserId))
