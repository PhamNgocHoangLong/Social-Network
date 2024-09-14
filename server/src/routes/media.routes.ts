import { Router } from 'express'
import { uploadImageController } from '~/controllers/medias.controller'
import { accessTokenValidator } from '~/middlewares/auth.middleware'
import { wrapHandleRequest } from '~/utils/handler'

const mediaRouter = Router()

mediaRouter.post('/upload-image', accessTokenValidator, wrapHandleRequest(uploadImageController))

export default mediaRouter
