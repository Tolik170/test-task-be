import { errors } from '../consts/errors.js'
import { ErrorType, GlobalError } from '../types/index.js'

export const createError = (status: number, errorInfo: ErrorType) => {
  const err: GlobalError = new Error(errorInfo.message)
  err.status = status
  err.code = errorInfo.code

  return err
}

export const createUnauthorizedError = () => {
  return createError(401, errors.UNAUTHORIZED)
}

export const createForbiddenError = () => {
  return createError(403, errors.FORBIDDEN)
}

export const createNotFoundError = () => {
  return createError(404, errors.NOT_FOUND)
}
