import { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import { AccountModel } from '../../../../domain/model/account'
import { AddAccountModel } from '../../../../domain/usercase/add-account'
import { MongoHelper } from '../helper/mongo-helper'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/load-account-by-email-repository'
import { UpdateAccountAccessToken } from '../../../../data/protocols/db/update-account-access-token'
import { LoadAccountByIdRepository } from '../../../../data/protocols/db/load-account-by-id-repository'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccountAccessToken, LoadAccountByIdRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.insertOne(accountData)
    return MongoHelper.map(accountData)
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map(account)
  }

  async loadById (id: string): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const objectId = MongoHelper.objectId(id)
    const account = await accountCollection.findOne({ _id: objectId })
    return account && MongoHelper.map(account)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({
      _id: MongoHelper.objectId(id)
    }, {
      $set: {
        accessToken: token
      }
    })
  }
}
