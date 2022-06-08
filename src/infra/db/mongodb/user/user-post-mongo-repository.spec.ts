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

  test('Should findByUserId returns correct values', async () => {
    const sut = new UserPostMongoRepository()
    const targetId = MongoHelper.objectId('62981df76d3661cf33982509')
    const noTargetId = MongoHelper.objectId('6297e8eb0bf54e0163efcc5f')
    await userPostCollection.insertMany([
      {
        userId: targetId,
        message: 'any_message_1',
        date: new Date(2022, 1, 1)
      },
      {
        userId: noTargetId,
        message: 'any_message_2',
        date: new Date(2022, 1, 1)
      },
      {
        userId: targetId,
        message: 'any_message_3',
        date: new Date(2022, 1, 1)
      }
    ])
    const userPostArray = await sut.findByUserId('62981df76d3661cf33982509')
    expect(userPostArray[0].id).toBeTruthy()
    expect(userPostArray[0].userId).toEqual('62981df76d3661cf33982509')
    expect(userPostArray[0].userName).toBeNull()
    expect(userPostArray[0].message).toEqual('any_message_1')
    expect(userPostArray[0].date).toBeTruthy()
    expect(userPostArray[1].id).toBeTruthy()
    expect(userPostArray[1].userId).toEqual('62981df76d3661cf33982509')
    expect(userPostArray[1].userName).toBeNull()
    expect(userPostArray[1].message).toEqual('any_message_3')
    expect(userPostArray[1].date).toBeTruthy()
  })

  test('Should findByUserId returns correct values', async () => {
    const sut = new UserPostMongoRepository()
    const targetId = MongoHelper.objectId('62981df76d3661cf33982509')
    const noTargetId = MongoHelper.objectId('6297e8eb0bf54e0163efcc5f')
    await userPostCollection.insertMany([
      {
        userId: targetId,
        message: 'any_message_1',
        date: new Date(2022, 1, 1)
      },
      {
        userId: noTargetId,
        message: 'any_message_2',
        date: new Date(2022, 1, 1)
      },
      {
        userId: targetId,
        message: 'any_message_3',
        date: new Date(2022, 1, 1)
      }
    ])
    const userPostArray = await sut.findAll()
    expect(userPostArray[0].id).toBeTruthy()
    expect(userPostArray[0].userId).toEqual('62981df76d3661cf33982509')
    expect(userPostArray[0].userName).toBeNull()
    expect(userPostArray[0].message).toEqual('any_message_1')
    expect(userPostArray[0].date).toBeTruthy()
    expect(userPostArray[1].id).toBeTruthy()
    expect(userPostArray[1].userId).toEqual('6297e8eb0bf54e0163efcc5f')
    expect(userPostArray[1].userName).toBeNull()
    expect(userPostArray[1].message).toEqual('any_message_2')
    expect(userPostArray[2].date).toBeTruthy()
    expect(userPostArray[2].id).toBeTruthy()
    expect(userPostArray[2].userId).toEqual('62981df76d3661cf33982509')
    expect(userPostArray[2].userName).toBeNull()
    expect(userPostArray[2].message).toEqual('any_message_3')
    expect(userPostArray[2].date).toBeTruthy()
  })
})
