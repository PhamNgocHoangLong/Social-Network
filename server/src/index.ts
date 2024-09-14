import express from 'express'
import cors from 'cors'
import { envConfig } from './utils/config'
import { defaultErrorHandler } from './middlewares/error.middleware'
import database from './services/database.services'
import authRouter from './routes/auth.routes'
import postRouter from './routes/post.routes'
import { initFolder } from './utils/files'
import { UPLOAD_IMAGE_TEMP_DIR } from './constants/dir'
import mediaRouter from './routes/media.routes'
import userRouter from './routes/user.routes'

const app = express()
const PORT = envConfig.port

initFolder(UPLOAD_IMAGE_TEMP_DIR)

app.use(cors())
app.use(express.json())

app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use('/medias', mediaRouter)

app.use(defaultErrorHandler)

database.connectDB()

app.listen(PORT, () => {
  console.log('Server is running on port', PORT)
})
