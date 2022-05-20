import { AccountModel } from '../../domain/model/account'
import { AddAccount, AddAccountModel } from '../../domain/usercase/add-account'
import { Hasher } from '../protocols/criptography/hasher'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher
  ) {}

  async add (account: AddAccountModel): Promise<AccountModel> {
    await this.hasher.hash(account.password)
    return null
  }
}
