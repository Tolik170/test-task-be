import { Request, Response } from 'express'
import { connection } from '../db.js'
import { createError } from '../utils/errorsHelper.js'
import { encryptMessage, decryptMessage } from '../utils/cesarCipher.js'
import { errors } from '../consts/errors.js'
import { SQLs } from '../consts/sql.js'

export const messageController = {
  addMessage: (req: Request, res: Response) => {
    const { userId, message } = req.body

    const timestamp = new Date().toISOString()

    connection.query(SQLs.insertInto('messages'), { userId, message, createdAt: timestamp }, (error, result) => {
      if (error) {
        return createError(500, errors.INTERNAL_SERVER_ERROR, res)
      }

      res.status(201).json({ id: result.insertId, message: 'Added new message' })
    })
  },

  getMessagesByUserId: (req: Request, res: Response) => {
    const { userId } = req.params

    connection.query(SQLs.getAllBy('messages', 'userId'), [userId], (error, results) => {
      if (error) {
        return createError(500, errors.INTERNAL_SERVER_ERROR, res)
      }

      res.status(200).json(results)
    })
  },

  updateMessage: (req: Request, res: Response) => {
    const { id } = req.params
    const { method, shift } = req.body

    connection.query(SQLs.getAllBy('messages', 'id'), [id], (error, results) => {
      if (error) {
        return createError(500, errors.INTERNAL_SERVER_ERROR, res)
      }

      if (results.length === 0) {
        return createError(404, errors.MESSAGE_NOT_FOUND, res)
      }

      const message = results[0].message
      const newMessage = method === 'encrypt' ? encryptMessage(message, shift) : decryptMessage(message, shift)

      connection.query(SQLs.updateBy('messages', 'message', 'id'), [newMessage, id], (error) => {
        if (error) {
          return createError(500, errors.INTERNAL_SERVER_ERROR, res)
        }

        res.status(200).send({ message: 'Successfully updated' })
      })
    })
  },

  deleteMessagesByUserId: (req: Request, res: Response) => {
    const { userId } = req.params

    connection.query(SQLs.deleteAllBy('messages', 'userId'), [userId], (error, result) => {
      if (error) {
        return createError(500, errors.INTERNAL_SERVER_ERROR, res)
      }

      if (result.affectedRows === 0) {
        return createError(404, errors.MESSAGE_NOT_FOUND, res)
      }

      res.status(200).send({ message: 'Successfully deleted' })
    })
  }
}
