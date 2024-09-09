import { Collection, Db, MongoClient } from 'mongodb'
import { envConfig } from '~/utils/config'
import { RefreshToken } from '~/models/schemas/refresh_token.schema'
import { User } from '~/models/schemas/User.schema'
import { Post } from '~/models/schemas/post.schema'
import { Follower } from '~/models/schemas/follower.schema'

const uri = `mongodb+srv://${envConfig.mongodbUsername}:${envConfig.mongodbPassword}@${envConfig.mongodbName}.l22nh.mongodb.net/?retryWrites=true&w=majority&appName=${envConfig.mongodbName}`

class DataBaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(envConfig.mongodbName)
  }

  async connectDB() {
    try {
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  get users(): Collection<User> {
    return this.db.collection(envConfig.mongodbUsersCollection)
  }

  get refresh_tokens(): Collection<RefreshToken> {
    return this.db.collection(envConfig.mongodbRefreshTokenCollection)
  }

  get followers(): Collection<Follower> {
    return this.db.collection(envConfig.mongodbFollowersCollection)
  }

  get posts(): Collection<Post> {
    return this.db.collection(envConfig.mongodbPostsCollection)
  }
}

const database = new DataBaseService()

export default database
