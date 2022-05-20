import { AccountModel } from '../../domain/model/account'
import { AddAccountModel } from '../../domain/usercase/add-account'
import { Hasher } from '../protocols/criptography/hasher'
import { AddAccountRepository } from '../protocols/db/add-account-repository'
import { DbAddAccount } from './db-add-account'

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return 'hashed_password'
    }
  }
  return new HasherStub()
}

const makeFakeAddAccount = (): AddAccountModel => ({
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
})

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: AddAccountModel): Promise<AccountModel> {
      return makeFakeAccount()
    }
  }
  return new AddAccountRepositoryStub()
}

interface SutTypes {
  sut: DbAddAccount
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
  const hasherStub = makeHasher()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub)
  return {
    hasherStub,
    sut,
    addAccountRepositoryStub
  }
}

describe('DbAddAccount', () => {
  test('Should call Hasher with correct value', async () => {
    const { sut, hasherStub } = makeSut()
    const hasherSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(makeFakeAddAccount())
    expect(hasherSpy).toBeCalledWith('valid_password')
  })

  test('Should return throws if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakeAddAccount())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addAccountRepSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(makeFakeAddAccount())
    expect(addAccountRepSpy).toBeCalledWith({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    })
  })
})
