import { LoginReqBody, RegisterReqBody } from '~/models/requests/auth.request'
import database from './database.services'
import { User } from '~/models/schemas/User.schema'
import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'
import { envConfig } from '~/utils/config'
import { RefreshToken } from '~/models/schemas/refresh_token.schema'
import { ObjectId } from 'mongodb'
import { USER_MESSAGES } from '~/constants/messages'

class AuthServices {
  private signAccessToken(user_id: string) {
    return signToken({
      payload: { user_id },
      privateKey: envConfig.accessTokenSecret,
      options: { expiresIn: '7d', algorithm: 'HS256' }
    })
  }

  private signRefreshToken(user_id: string) {
    return signToken({
      payload: { user_id },
      privateKey: envConfig.refreshTokenSecret,
      options: { expiresIn: '30d', algorithm: 'HS256' }
    })
  }

  private signBothTokens(user_id: string) {
    return Promise.all([this.signAccessToken(user_id), this.signRefreshToken(user_id)])
  }

  async login(user_id: string) {
    const [access_token, refresh_token] = await this.signBothTokens(user_id)
    await database.refresh_tokens.insertOne(new RefreshToken({ user_id: new ObjectId(user_id), token: refresh_token }))

    return {
      access_token,
      refresh_token
    }
  }

  async register(body: RegisterReqBody) {
    const user_id = new ObjectId()
    await database.users.insertOne(new User({ ...body, _id: user_id, password: hashPassword(body.password) }))
    const [access_token, refresh_token] = await this.signBothTokens(user_id.toString())
    await database.refresh_tokens.insertOne(new RefreshToken({ user_id, token: refresh_token }))
    return {
      access_token,
      refresh_token
    }
  }

  async logout(refresh_token: string) {
    await database.refresh_tokens.deleteOne({ token: refresh_token })
    return { message: USER_MESSAGES.LOGOUT_SUCCESS }
  }
}

const authServices = new AuthServices()

export default authServices
