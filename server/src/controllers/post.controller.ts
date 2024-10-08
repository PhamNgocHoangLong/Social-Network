import { ParamsDictionary } from 'express-serve-static-core'
import { NextFunction, Request, Response } from 'express'
import { CreatePostBodyReq, GetNewFeedsReqQuery } from '~/models/requests/post.request'
import { HTTP_STATUS_CODE } from '~/constants/httpStatusCode'
import { POST_MESSAGES } from '~/constants/messages'
import postServices from '~/services/post.services'

export const createPostController = async (
  req: Request<ParamsDictionary, any, CreatePostBodyReq>,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.decoded_authorization?.user_id as string
  const body = req.body

  const result = await postServices.createPost(user_id, body)

  return res.status(HTTP_STATUS_CODE.OK).json({
    message: POST_MESSAGES.CREATE_POST_SUCCESSFULLY,
    result
  })
}

export const getNewFeedsController = async (
  req: Request<ParamsDictionary, any, any, GetNewFeedsReqQuery>,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.decoded_authorization?.user_id as string
  const page = Number(req.query.page)
  const limit = Number(req.query.limit)

  const result = await postServices.getNewFeeds(user_id, page, limit)

  return res.status(HTTP_STATUS_CODE.OK).json({
    message: POST_MESSAGES.GET_NEW_FEEDS_SUCCESSFULLY,
    result: result.posts,
    limit,
    page,
    totalPage: Math.ceil(result.total / limit)
  })
}

export const getPostByUserIdController = async (req: Request, res: Response, next: NextFunction) => {
  const user_id = req.decoded_authorization?.user_id as string
  const page = Number(req.query.page)
  const limit = Number(req.query.limit)
  const result = await postServices.getPostByUserId(user_id, page, limit)

  return res.status(HTTP_STATUS_CODE.OK).json({
    message: POST_MESSAGES.GET_POSTS_SUCCESSFULLY,
    result: result.posts,
    limit,
    page,
    totalPage: Math.ceil(result.total / limit)
  })
}
