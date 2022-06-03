import { Collection } from 'mongodb'
import { MongoHelper } from '../helper/mongo-helper'
import { UserPostMongoRepository } from './user-post-mongo-repository'

let userPostCollection: Collection

describe('UserPostMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    userPostCollection = await MongoHelper.getCollection('user-posts')
    await userPostCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should call userPost insertOne with correct values', async () => {
    const sut = new UserPostMongoRepository()
    const userPost = ({
      userId: '62981df76d3661cf33982509',
      message: 'any_message'
    })
    await sut.add(userPost)
    const collection = await userPostCollection.find().next()
    expect(collection._id).toBeTruthy()
    expect(collection.userId).toEqual(MongoHelper.objectId(userPost.userId))
    expect(collection.message).toEqual(userPost.message)
    expect(collection.date).toBeTruthy()
  })
})
