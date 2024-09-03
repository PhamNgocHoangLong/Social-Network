import express from 'express'
import cors from 'cors'
import { envConfig } from './utils/config'
import { defaultErrorHandler } from './middlewares/error.middleware'
import database from './services/database.services'

const app = express()
const PORT = envConfig.port

app.use(cors())
app.use(express.json())

app.use('/', (req, res) => {
  res.send('Hello World')
})

app.use(defaultErrorHandler)

database.connectDB()

app.listen(PORT, () => {
  console.log('Server is running on port', PORT)
})
