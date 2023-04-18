import { NextFunction, Response, Request } from 'express'

import { validateToken } from '../utils/token.js'
import { createUnauthorizedError } from '../utils/errorsHelper.js'
import { JwtPayload } from 'jsonwebtoken'

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload
}

export const authMiddleware = (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
  const token = req.cookies.jwt

  if (!token) {
    throw createUnauthorizedError()
  }

  const userData = validateToken(token)
  if (!userData) {
    throw createUnauthorizedError()
  }

  req.user = userData
  next()
}
