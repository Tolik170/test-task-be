import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config({ path: './.env' })

type Payload = {
  id: number
}

const oneDayInMs = 86400000

export const cookieOptions = {
  maxAge: oneDayInMs,
  httpOnly: true,
}

export const generateToken = (payload: Payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })

  return token
}

export const validateToken = (token: string) => {
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET)
    return data
  } catch (e) {
    return null
  }
}
