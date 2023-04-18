import { Response } from 'express'
import { errors } from '../consts/errors.js'
import { ErrorInfo, GlobalError } from '../types/index.js'

export const createError = (status: number, errorInfo: ErrorInfo, res?: Response) => {
  const err: GlobalError = new Error(errorInfo.message)
  err.status = status
  err.code = errorInfo.code

  res.status(status).json({ ...err, message: errorInfo.message })
}

export const createUnauthorizedError = () => {
  const err: GlobalError = new Error(errors.UNAUTHORIZED.message)
  err.status = 401
  err.code = errors.UNAUTHORIZED.code

  return err
}


export const createNotFoundError = () => {
  const err: GlobalError = new Error(errors.NOT_FOUND.message)
  err.status = 404
  err.code = errors.NOT_FOUND.code

  return err
}
