import { AccountModel } from '../../../domain/model/account'
import { DbAuthentication } from './db-authentication'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'
import { HasherCompare } from '../../protocols/criptography/hasher-compare'

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel> {
      return makeFakeAccount()
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeHasherCompare = (): HasherCompare => {
  class HasherCompareStub implements HasherCompare {
    async compare (value: string, hash: string): Promise<boolean> {
      return true
    }
  }
  return new HasherCompareStub()
}

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password'
})

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashCompareStub: HasherCompare
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const hashCompareStub = makeHasherCompare()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub, hashCompareStub)
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashCompareStub
  }
}

describe('DbAuthentication', () => {
  test('Should call LoadAccountByEmailRepository with correct value', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadByEmailSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(loadByEmailSpy).toBeCalledWith('any_email@mail.com')
  })

  test('Should return null if LoadAccountByEmailRepository return null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const promise = await sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(promise).toBeNull()
  })

  test('Should return throws if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    await expect(promise).rejects.toThrow()
  })

  test('Should call HasherCompare with correct value', async () => {
    const { sut, hashCompareStub } = makeSut()
    const loadByEmailSpy = jest.spyOn(hashCompareStub, 'compare')
    await sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(loadByEmailSpy).toBeCalledWith('any_password', 'hashed_password')
  })
})
