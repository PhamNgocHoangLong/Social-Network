import { ParamsDictionary } from 'express-serve-static-core'
import { NextFunction, Request, Response } from 'express'
import { FollowBodyReq, UnLikeReqParams } from '~/models/requests/user.request'
import userServices from '~/services/user.services'
import { HTTP_STATUS_CODE } from '~/constants/httpStatusCode'
import { USER_MESSAGES } from '~/constants/messages'

export const followerController = async (
  req: Request<ParamsDictionary, any, FollowBodyReq>,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.decoded_authorization?.user_id as string
  const followed_user_id = req.body.followed_user_id

  const result = await userServices.follow(user_id, followed_user_id)

  return res.status(HTTP_STATUS_CODE.OK).json(result)
}

export const unFollowerController = async (req: Request<UnLikeReqParams>, res: Response, next: NextFunction) => {
  const user_id = req.decoded_authorization?.user_id as string
  const followed_user_id = req.params.followed_user_id

  const result = await userServices.unFollow(user_id, followed_user_id)

  return res.status(HTTP_STATUS_CODE.OK).json(result)
}

export const getMeController = async (req: Request, res: Response, next: NextFunction) => {
  const user_id = req.decoded_authorization?.user_id as string

  const result = await userServices.getMe(user_id)

  return res.status(HTTP_STATUS_CODE.OK).json({
    message: USER_MESSAGES.GET_ME_SUCCESSFULLY,
    result
  })
}

export const getSuggestsController = async (req: Request, res: Response, next: NextFunction) => {
  const user_id = req.decoded_authorization?.user_id as string

  const result = await userServices.getSuggests(user_id)

  return res.status(HTTP_STATUS_CODE.OK).json({
    message: USER_MESSAGES.GET_SUGGESTS_SUCCESSFULLY,
    result
  })
}
