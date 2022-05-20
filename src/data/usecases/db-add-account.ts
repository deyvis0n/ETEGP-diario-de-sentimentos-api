import { AccountModel } from '../../domain/model/account'
import { AddAccount, AddAccountModel } from '../../domain/usercase/add-account'
import { Hasher } from '../protocols/criptography/hasher'
import { AddAccountRepository } from '../protocols/db/add-account-repository'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (account: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(account.password)
    await this.addAccountRepository.add(Object.assign(account, { password: hashedPassword }))
    return null
  }
}
