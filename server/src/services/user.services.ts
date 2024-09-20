import { ObjectId } from 'mongodb'
import database from './database.services'
import { Follower } from '~/models/schemas/follower.schema'
import { USER_MESSAGES } from '~/constants/messages'
import { User } from '~/models/schemas/User.schema'
import { ErrorWithStatus } from '~/models/errors'
import { HTTP_STATUS_CODE } from '~/constants/httpStatusCode'

class UserServices {
  async follow(user_id: string, followed_user_id: string) {
    const follower = await database.followers.findOne({
      user_id: new ObjectId(user_id),
      followed_user_id: new ObjectId(followed_user_id)
    })

    if (!follower) {
      await database.followers.insertOne(
        new Follower({
          user_id: new ObjectId(user_id),
          followed_user_id: new ObjectId(followed_user_id)
        })
      )
      return {
        message: USER_MESSAGES.FOLLOW_SUCCESS
      }
    }
    return {
      message: USER_MESSAGES.FOLLOWED
    }
  }
  async unFollow(user_id: string, followed_user_id: string) {
    const follower = await database.followers.findOne({
      user_id: new ObjectId(user_id),
      followed_user_id: new ObjectId(followed_user_id)
    })

    if (follower) {
      await database.followers.deleteOne({
        user_id: new ObjectId(user_id),
        followed_user_id: new ObjectId(followed_user_id)
      })
      return {
        message: USER_MESSAGES.UNFOLLOW_SUCCESS
      }
    }
    return {
      message: USER_MESSAGES.ALREADY_UNFOLLOWED
    }
  }

  async getMe(user_id: string) {
    const user = await database.users.findOne(
      {
        _id: new ObjectId(user_id)
      },
      {
        projection: {
          password: 0,
          forgot_password_token: 0
        }
      }
    )
    return user
  }

  async getSuggests(user_id: string) {
    const user_id_obj = new ObjectId(user_id)
    const follower = await database.followers
      .find(
        { user_id: user_id_obj },
        {
          projection: {
            followed_user_id: 1,
            _id: 0
          }
        }
      )
      .toArray()

    const followed_user_ids = follower.map((item) => item.followed_user_id)
    followed_user_ids.push(user_id_obj)
    const user = await database.users
      .aggregate<User>([
        {
          $match: {
            _id: {
              $nin: followed_user_ids
            }
          }
        },
        {
          $sample: {
            size: 5
          }
        },
        {
          $project: {
            password: 0,
            forgot_password_token: 0
          }
        }
      ])
      .toArray()
    return user
  }

  async getUserProfile(username: string) {
    const user = await database.users
      .aggregate<User & { followers: User[] }>([
        {
          $match: {
            username: username
          }
        },
        {
          $lookup: {
            from: 'followers',
            localField: '_id',
            foreignField: 'followed_user_id',
            as: 'followers'
          }
        },
        {
          $unwind: '$followers'
        },
        {
          $lookup: {
            from: 'users',
            localField: 'followers.user_id',
            foreignField: '_id',
            as: 'followers'
          }
        },
        {
          $unwind: {
            path: '$followers'
          }
        },
        {
          $project: {
            password: 0,
            forgot_password_token: 0,
            'followers.password': 0,
            'followers.forgot_password_token': 0
          }
        },
        {
          $group: {
            _id: '$_id',
            root: {
              $mergeObjects: '$$ROOT'
            },
            followers: {
              $push: '$followers'
            }
          }
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [
                '$root',
                {
                  followers: '$followers'
                }
              ]
            }
          }
        }
      ])
      .toArray()

    if (!user) {
      throw new ErrorWithStatus({
        message: USER_MESSAGES.USER_NOT_FOUND,
        status: HTTP_STATUS_CODE.NOT_FOUND
      })
    }

    return user
  }
}

const userServices = new UserServices()

export default userServices
