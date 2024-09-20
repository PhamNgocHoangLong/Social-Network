import { ParamsDictionary } from 'express-serve-static-core'
export interface FollowBodyReq {
  followed_user_id: string
}

export interface UnLikeReqParams extends ParamsDictionary, FollowBodyReq {}
export interface UserProfileParams {
  username: string
}
