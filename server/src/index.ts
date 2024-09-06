import express from 'express'
import cors from 'cors'
import { envConfig } from './utils/config'
import { defaultErrorHandler } from './middlewares/error.middleware'
import database from './services/database.services'
import authRouter from './routes/auth.routes'

const app = express()
const PORT = envConfig.port

app.use(cors())
app.use(express.json())

app.use('/auth', authRouter)

app.use(defaultErrorHandler)

database.connectDB()

app.listen(PORT, () => {
  console.log('Server is running on port', PORT)
})
