import { AddUserPostRepository } from '../../../../data/protocols/db/add-user-post-repository'
import { AddUserPostModel } from '../../../../domain/usercase/add-user-post'
import { MongoHelper } from '../helper/mongo-helper'

export class UserPostMongoRepository implements AddUserPostRepository {
  async add (userPost: AddUserPostModel): Promise<void> {
    const userPostCollection = MongoHelper.getCollection('user-posts')
    const userId = MongoHelper.objectId(userPost.userId)
    const { message } = userPost
    await userPostCollection.insertOne({
      userId: userId,
      message: message,
      date: new Date()
    })
  }
}
