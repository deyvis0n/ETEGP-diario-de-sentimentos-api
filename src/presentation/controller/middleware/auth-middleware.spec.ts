import { LoadAccountByToken, LoadAccountByTokenResult } from '../../../domain/usercase/load-account-by-token'
import { AuthMiddleware } from './auth-middleware'

const makeLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: string): Promise<LoadAccountByTokenResult> {
      return { id: 'any_token' }
    }
  }
  return new LoadAccountByTokenStub()
}

interface SutTypes {
  sut: AuthMiddleware
  loadAccountByTokenStub: LoadAccountByToken
}

const makeSut = (): SutTypes => {
  const loadAccountByTokenStub = makeLoadAccountByToken()
  const sut = new AuthMiddleware(loadAccountByTokenStub)
  return {
    sut,
    loadAccountByTokenStub
  }
}

describe('AuthMiddleware', () => {
  test('Should calls LoadAccountByToken with correct values', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    const loadSpyt = jest.spyOn(loadAccountByTokenStub, 'load')
    const httpRequest = {
      body: {
        accessToken: 'any_token'
      }
    }
    await sut.handle(httpRequest)
    expect(loadSpyt).toHaveBeenCalledWith('any_token')
  })
})
