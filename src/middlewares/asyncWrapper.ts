import { NextFunction, Request, Response } from 'express'

interface AsyncRouteHandler {
  (_req: Request, _res: Response): void
}

export const asyncWrapper = (fn: AsyncRouteHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res)
    } catch (err) {
      next(err)
    }
  }
}
