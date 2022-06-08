import { AddUserPostRepository } from '../../../../data/protocols/db/add-user-post-repository'
import { AddUserPostModel } from '../../../../domain/usercase/add-user-post'
import { FindAllUserPostByUseIdRepository } from '../../../../data/protocols/db/find-all-user-post-by-user-id'
import { MongoHelper } from '../helper/mongo-helper'
import { UserPostModel } from '../../../../domain/model/user-post'
import { FindAllPosts } from '../../../../data/protocols/db/find-all-posts'

export class UserPostMongoRepository implements AddUserPostRepository, FindAllUserPostByUseIdRepository, FindAllPosts {
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

  async findByUserId (userId: string): Promise<UserPostModel[]> {
    const userPostCollection = MongoHelper.getCollection('user-posts')
    const userIdObject = MongoHelper.objectId(userId)
    const postArray = await userPostCollection.find({ userId: userIdObject }).toArray()
    const userPostArray = []
    for (const post of postArray) {
      userPostArray.push(Object.assign(MongoHelper.postMap(post), { userName: null }))
    }
    return userPostArray
  }

  async findAll (): Promise<UserPostModel[]> {
    const userPostCollection = MongoHelper.getCollection('user-posts')
    const postArray = await userPostCollection.find({}).toArray()
    const userPostArray = []
    for (const post of postArray) {
      userPostArray.push(Object.assign(MongoHelper.postMap(post), { userName: null }))
    }
    return userPostArray
  }
}
