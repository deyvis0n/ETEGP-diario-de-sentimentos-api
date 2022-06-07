import { Decrypter } from '../../protocols/criptography/decrypter'
import { DbLoadAccountByToken } from './db-load-account-by-token'
import { LoadAccountByIdRepository } from '../../protocols/db/load-account-by-id-repository'
import { AccountModel } from '../../../domain/model/account'

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return 'any_id'
    }
  }
  return new DecrypterStub()
}

const makeLoadAccountByIdRepository = (): LoadAccountByIdRepository => {
  class LoadAccountByIdRepositoryStub implements LoadAccountByIdRepository {
    async loadById (id: string): Promise<AccountModel> {
      return makeFakeAccount()
    }
  }
  return new LoadAccountByIdRepositoryStub()
}

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'user_name',
  email: 'any_email@mail.com',
  password: 'hashed_password'
})

interface SutTypes {
  sut: DbLoadAccountByToken
  decrypterStub: Decrypter
  loadAccountByIdRepositoryStub: LoadAccountByIdRepository
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter()
  const loadAccountByIdRepositoryStub = makeLoadAccountByIdRepository()
  const sut = new DbLoadAccountByToken(decrypterStub, loadAccountByIdRepositoryStub)
  return {
    sut,
    decrypterStub,
    loadAccountByIdRepositoryStub
  }
}

describe('DbLoadAccountByToken', () => {
  test('Should calls Decrypter with correct value', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token')
    expect(decryptSpy).toBeCalledWith('any_token')
  })

  test('Should return null is Decrypter throws', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockImplementationOnce(() => { throw new Error() })
    const account = await sut.load('any_token')
    expect(account).toBeNull()
  })

  test('Should calls Decrypter with correct value', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    const decryptSpy = jest.spyOn(loadAccountByIdRepositoryStub, 'loadById')
    await sut.load('any_token')
    expect(decryptSpy).toBeCalledWith('any_id')
  })

  test('Should return an account if LoadAccountByIdRepository returns an account', async () => {
    const { sut } = makeSut()
    const accountToCompare = makeFakeAccount()
    const account = await sut.load('any_token')
    expect(account).toEqual(accountToCompare)
  })

  test('Should return null if LoadAccountByIdRepository returns null', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByIdRepositoryStub, 'loadById').mockReturnValueOnce(null)
    const account = await sut.load('any_token')
    expect(account).toBeNull()
  })

  test('Should return throws if LoadAccountByIdRepository throws', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByIdRepositoryStub, 'loadById').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.load('any_token')
    await expect(promise).rejects.toThrow()
  })
})
