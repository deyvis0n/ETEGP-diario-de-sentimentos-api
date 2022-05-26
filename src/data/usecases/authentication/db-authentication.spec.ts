import { AccountModel } from '../../../domain/model/account'
import { DbAuthentication } from './db-authentication'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'
import { HasherCompare } from '../../protocols/criptography/hasher-compare'
import { AuthenticationModel } from '../../../domain/usercase/authentication'
import { Encrypter } from '../../protocols/criptography/encrypter'

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

const makeEncrypt = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async generate (value: string): Promise<string> {
      return 'any_access_token'
    }
  }
  return new EncrypterStub()
}

const makeFakeAuthModel = (): AuthenticationModel => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

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
  encrypterStub: Encrypter
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const hashCompareStub = makeHasherCompare()
  const encrypterStub = makeEncrypt()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub, hashCompareStub, encrypterStub)
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashCompareStub,
    encrypterStub
  }
}

describe('DbAuthentication', () => {
  test('Should call LoadAccountByEmailRepository with correct value', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadByEmailSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.auth(makeFakeAuthModel())
    expect(loadByEmailSpy).toBeCalledWith('any_email@mail.com')
  })

  test('Should return null if LoadAccountByEmailRepository return null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const promise = await sut.auth(makeFakeAuthModel())
    expect(promise).toBeNull()
  })

  test('Should return throws if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.auth(makeFakeAuthModel())
    await expect(promise).rejects.toThrow()
  })

  test('Should call HasherCompare with correct value', async () => {
    const { sut, hashCompareStub } = makeSut()
    const loadByEmailSpy = jest.spyOn(hashCompareStub, 'compare')
    await sut.auth(makeFakeAuthModel())
    expect(loadByEmailSpy).toBeCalledWith('any_password', 'hashed_password')
  })

  test('Should return null if HasherCompare return false', async () => {
    const { sut, hashCompareStub } = makeSut()
    jest.spyOn(hashCompareStub, 'compare').mockReturnValueOnce(new Promise(resolve => resolve(false)))
    const promise = await sut.auth(makeFakeAuthModel())
    expect(promise).toBeNull()
  })

  test('Should return throws if HasherCompare throws', async () => {
    const { sut, hashCompareStub } = makeSut()
    jest.spyOn(hashCompareStub, 'compare').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.auth(makeFakeAuthModel())
    await expect(promise).rejects.toThrow()
  })

  test('Should call Encrypt with correct value', async () => {
    const { sut, encrypterStub } = makeSut()
    const loadByEmailSpy = jest.spyOn(encrypterStub, 'generate')
    await sut.auth(makeFakeAuthModel())
    expect(loadByEmailSpy).toBeCalledWith('any_id')
  })
})
