import { Request, Response } from 'express'

import { errors } from '../consts/errors.js'
import { GlobalError } from '../types/index.js'

export const errorMiddleware = (err: GlobalError, _req: Request, res: Response) => {
  const { status, code, message } = err

  console.log(err)

  if (!status && !code) {
    return res.status(500).json({
      status: 500,
      code: errors.INTERNAL_SERVER_ERROR.code,
      message
    })
  }
  res.status(status).json({
    status,
    code,
    message
  })
}
