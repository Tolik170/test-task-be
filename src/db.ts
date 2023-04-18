import mysql from 'mysql'
import dotenv from 'dotenv'

dotenv.config({ path: './.env' })

export const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
})
  
connection.connect((err) => {
  if(err) {
    console.log('Error DB connection')
  }
  else {
    console.log('DB connected')
  }
})
