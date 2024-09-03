import { config } from 'dotenv'
config()

export const envConfig = {
  port: process.env.PORT as string,
  mongodbUsername: process.env.MONGODB_USERNAME as string,
  mongodbPassword: process.env.MONGODB_PASSWORD as string,
  mongodbName: process.env.MONGODB_DB_NAME as string,
  mongodbUsersCollection: process.env.MONGODB_USERS_COLLECTION as string
}
