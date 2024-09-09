import { Router } from 'express'
import { createPostController, getNewFeedsController, getPostByUserIdController } from '~/controllers/post.controller'
import { accessTokenValidator } from '~/middlewares/auth.middleware'
import { createPostValidator, paginationValidator } from '~/middlewares/post.middlware'
import { wrapHandleRequest } from '~/utils/handler'

const postRouter = Router()

postRouter.post('/', accessTokenValidator, createPostValidator, wrapHandleRequest(createPostController))
postRouter.get('/new-feeds', paginationValidator, accessTokenValidator, wrapHandleRequest(getNewFeedsController))
postRouter.get('/', paginationValidator, accessTokenValidator, wrapHandleRequest(getPostByUserIdController))

export default postRouter
