import { RequestHandler } from 'express'

export const cc: RequestHandler = (_req, _res, next) => {
  console.log('middleware works')
  next()
}
