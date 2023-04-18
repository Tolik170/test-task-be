import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'

import { errorMiddleware } from './middlewares/errorHandling.js'
import { createNotFoundError } from './utils/errorsHelper.js'
import { router } from './routes/index.js'

dotenv.config({ path: './.env' })

const app = express()
const port = process.env.PORT || 4000

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: 'GET, POST, PATCH, DELETE',
    allowedHeaders: 'Content-Type, Authorization'
  })
)
app.use('/', router)
app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(createNotFoundError())
})
app.use(errorMiddleware)

app.listen(port, () => {
  console.log(`running on port ${port}`)
})
