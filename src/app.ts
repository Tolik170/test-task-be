import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

import { cc } from './middlewares/cc.js'
import { errorMiddleware } from './middlewares/errorHandling.js'
import { createNotFoundError } from './utils/errorsHelper.js'

const app = express()
const port = process.env.PORT || 4000

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(express.json())
app.use(bodyParser.json())
app.use(cc)
app.use(
  cors({
    // origin: CLIENT_URL,
    credentials: true,
    methods: 'GET, POST, PATCH, DELETE',
    allowedHeaders: 'Content-Type, Authorization'
  })
)
// app.use('/', router)
app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(createNotFoundError())
})
app.use(errorMiddleware)

app.listen(port, () => {
  console.log(`running on port ${port}`)
})
