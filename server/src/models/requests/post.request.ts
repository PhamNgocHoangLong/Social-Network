import { ObjectId } from 'mongodb'
import { MediaType } from '~/constants/common'

export interface CreatePostBodyReq {
  captions?: string
  hashtags?: string[]
  medias: MediaType[]
  mentions?: ObjectId[]
}

export interface GetNewFeedsReqQuery {
  page: string
  limit: string
}
