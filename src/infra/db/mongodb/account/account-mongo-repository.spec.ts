import { Collection } from 'mongodb'
import { AddAccountModel } from '../../../../domain/usercase/add-account'
import { MongoHelper } from '../helper/mongo-helper'
import { AccountMongoRepository } from './account-mongo-repository'

let accountCollection: Collection

describe('AccountMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  const makeFakeAccountData = (): AddAccountModel => ({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
  })

  const makeSut = (): AccountMongoRepository => {
    const sut = new AccountMongoRepository()
    return sut
  }

  test('Should return an account on add success', async () => {
    const sut = makeSut()
    const account = await sut.add(makeFakeAccountData())
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })

  test('Should calls findOne with correct values', async () => {
    const sut = makeSut()
    await accountCollection.insertOne(makeFakeAccountData())
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })

  test('Should return null if findOne return null', async () => {
    const sut = makeSut()
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeNull()
  })
})
