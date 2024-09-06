import { Request } from 'express'
import { ParamSchema, checkSchema } from 'express-validator'
import { JsonWebTokenError } from 'jsonwebtoken'
import { HTTP_STATUS_CODE } from '~/constants/httpStatusCode'
import { USER_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/errors'
import database from '~/services/database.services'
import { envConfig } from '~/utils/config'
import { hashPassword } from '~/utils/crypto'
import { verifyToken } from '~/utils/jwt'
import { validate } from '~/utils/validation'

const emailSchema: ParamSchema = {
  notEmpty: {
    errorMessage: USER_MESSAGES.EMAIL_IS_REQUIRED
  },
  isEmail: {
    errorMessage: USER_MESSAGES.EMAIL_IS_INVALID
  }
}
const passwordSchema: ParamSchema = {
  trim: true,
  notEmpty: {
    errorMessage: USER_MESSAGES.PASSWORD_IS_REQUIRED
  },
  isLength: {
    errorMessage: USER_MESSAGES.PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50,
    options: { min: 8, max: 50 }
  }
}

export const loginValidator = validate(
  checkSchema(
    {
      email: {
        ...emailSchema,
        custom: {
          options: async (value, { req }) => {
            const user = await database.users.findOne({ email: value, password: hashPassword(req.body.password) })
            if (!user) {
              throw new Error(USER_MESSAGES.EMAIL_OR_PASSWORD_IS_INCORRECT)
            }
            ;(req as Request).user = user
            return true
          }
        }
      },
      password: passwordSchema
    },
    ['body']
  )
)

export const registerValidator = validate(
  checkSchema(
    {
      email: {
        ...emailSchema,
        custom: {
          options: async (value, { req }) => {
            const user = await database.users.findOne({ email: value })
            if (user) {
              throw new Error(USER_MESSAGES.EMAIL_ALREADY_EXISTS)
            }
            ;(req as Request).user = user
            return true
          }
        }
      },
      name: {
        isString: {
          errorMessage: USER_MESSAGES.NAME_MUST_BE_A_STRING
        },
        trim: true,
        notEmpty: {
          errorMessage: USER_MESSAGES.NAME_IS_REQUIRED
        },
        isLength: {
          errorMessage: USER_MESSAGES.NAME_LENGTH_MUST_BE_FROM_1_TO_100,
          options: { min: 1, max: 100 }
        }
      },
      username: {
        isString: {
          errorMessage: USER_MESSAGES.USERNAME_MUST_BE_STRING
        },
        trim: true,
        notEmpty: {
          errorMessage: USER_MESSAGES.USERNAME_IS_REQUIRED
        },
        isLength: {
          errorMessage: USER_MESSAGES.USERNAME_LENGTH,
          options: { min: 1, max: 100 }
        },
        custom: {
          options: async (value) => {
            const user = await database.users.findOne({ name: value })
            if (user) {
              throw new Error(USER_MESSAGES.USERNAME_EXISTED)
            }
            return true
          }
        }
      },
      password: passwordSchema
    },
    ['body']
  )
)

export const accessTokenValidator = validate(
  checkSchema(
    {
      Authorization: {
        trim: true,
        custom: {
          options: async (value, { req }) => {
            const access_token = (value || '').split(' ')[1]
            if (!access_token) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS_CODE.UNAUTHORIZED,
                message: USER_MESSAGES.ACCESS_TOKEN_IS_REQUIRED
              })
            }
            try {
              const decoded_authorization = await verifyToken({
                token: access_token,
                privateKey: envConfig.accessTokenSecret
              })
              ;(req as Request).decoded_authorization = decoded_authorization
              return true
            } catch (error) {
              if (error instanceof JsonWebTokenError) {
                throw new ErrorWithStatus({
                  status: HTTP_STATUS_CODE.UNAUTHORIZED,
                  message: error.message || USER_MESSAGES.ACCESS_TOKEN_IS_INVALID
                })
                throw error
              }
            }
          }
        }
      }
    },
    ['headers']
  )
)

export const refreshTokenValidator = validate(
  checkSchema({
    refresh_token: {
      trim: true,
      custom: {
        options: async (value, { req }) => {
          if (!value) {
            throw new ErrorWithStatus({
              message: USER_MESSAGES.REFRESH_TOKEN_IS_REQUIRED,
              status: HTTP_STATUS_CODE.UNAUTHORIZED
            })
          }
          try {
            const [decoded_refreshToken, refresh_token] = await Promise.all([
              verifyToken({ token: value, privateKey: envConfig.refreshTokenSecret as string }),
              database.refresh_tokens.findOne({ token: value })
            ])
            if (!refresh_token) {
              throw new ErrorWithStatus({
                message: USER_MESSAGES.USED_REFRESH_TOKEN_OR_NOT_EXIST,
                status: HTTP_STATUS_CODE.UNAUTHORIZED
              })
            }
            ;(req as Request).decoded_refreshToken = decoded_refreshToken
          } catch (error) {
            if (error instanceof JsonWebTokenError) {
              throw new ErrorWithStatus({
                message: error.message || USER_MESSAGES.REFRESH_TOKEN_IS_INVALID,
                status: HTTP_STATUS_CODE.UNAUTHORIZED
              })
            }
            throw error
          }
          return true
        }
      }
    }
  })
)
