import { Request, Response } from 'express'
import Joi from 'joi'

import { connection } from '../db.js'
import { hashPassword } from '../utils/authHellpers.js'
import { createError } from '../utils/errorsHelper.js'
import { comparePasswords } from '../utils/authHellpers.js'
import { cookieOptions, generateToken } from '../utils/token.js'

import { SQLs } from '../consts/sql.js'
import { errors } from '../consts/errors.js'
import { emailRegex, passwordRegex } from '../consts/regex.js'

const schema = Joi.object({
  userName: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().regex(emailRegex).required(),
  password: Joi.string().min(8).max(20).regex(passwordRegex).required()
})

export const authController = {
  SignUp: (req: Request, res: Response) => {
    const { userName, email, password } = req.body

    const { error } = schema.validate({ userName, email, password })
    if (error) {
      return createError(400, error.details[0], res)
    }

    connection.query(SQLs.getAllBy('users', 'email'), [email], async (error, results) => {
      if(error) {
        return createError(500, errors.INTERNAL_SERVER_ERROR, res)
      }

      if (results.length) {
        return createError(409, errors.ALREADY_REGISTERED, res)
      }

      const hashedPassword = await hashPassword(password)

      connection.query(SQLs.insertInto('users'), { userName, email, password: hashedPassword }, (error, results) => {
        if(error) {
          return createError(500, errors.INTERNAL_SERVER_ERROR, res)
        }
        
        if (Object.keys(results).length) {
          const userId = results.insertId
          const token = generateToken({ id: userId })

          res.cookie('jwt', token, cookieOptions)
          res.status(201).json({ userId, token })
        }
      })
    })
  },

  SignIn: (req: Request, res: Response) => {
    const { email, password } = req.body

    connection.query(SQLs.getAllBy('users', 'email'), [email], async (error, results) => {
      if(error) {
        return createError(500, errors.INTERNAL_SERVER_ERROR, res)
      }

      if (!results.length || !(await comparePasswords(password, results[0].password))) {
        return createError(401, errors.INCORRECT_CREDENTIALS, res)
      }

      const user = {...results[0]}
      delete user.password
      const token = generateToken({ id: user.id })

      if (token) {
        res.cookie('jwt', token, cookieOptions)
      }

      res.status(200).json({ data: user, token })
    })
  },

  Logout: (_req: Request, res: Response) => {
    res
      .clearCookie('jwt', {
        secure: true,
        sameSite: 'none'
      })
      .status(200)
      .end()
  }
}
