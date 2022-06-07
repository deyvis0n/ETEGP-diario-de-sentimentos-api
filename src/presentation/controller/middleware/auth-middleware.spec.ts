import { LoadAccountByToken, LoadAccountByTokenResult } from '../../../domain/usercase/load-account-by-token'
import { AuthMiddleware } from './auth-middleware'
import { forbidden, ok, serverError } from '../../helper/http/http-helper'
import { AccessDeniedError } from '../../erros/access-denied-error'
import { HttpRequestMiddleware } from '../../protocols/http'

const makeLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: string): Promise<LoadAccountByTokenResult> {
      return { id: 'any_id' }
    }
  }
  return new LoadAccountByTokenStub()
}

const makeFakeRequest = (): HttpRequestMiddleware => ({
  accessToken: 'any_token'
})

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
    const HttpRequestMiddleware = makeFakeRequest()
    await sut.handle(HttpRequestMiddleware)
    expect(loadSpyt).toHaveBeenCalledWith('any_token')
  })

  test('Should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'load').mockReturnValueOnce(null)
    const httpRequestMiddleware = {
      accessToken: 'invalid_token'
    }
    const httpResponse = await sut.handle(httpRequestMiddleware)
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 403 if no token is provided', async () => {
    const { sut } = makeSut()
    const httpRequestMiddleware = {}
    const httpResponse = await sut.handle(httpRequestMiddleware)
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 200 and id if success', async () => {
    const { sut } = makeSut()
    const httpRequestMiddleware = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequestMiddleware)
    expect(httpResponse).toEqual(ok({ userId: 'any_id' }))
  })

  test('Should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'load').mockImplementationOnce(() => { throw new Error() })
    const httpRequestMiddleware = makeFakeRequest()
    const httpReponse = await sut.handle(httpRequestMiddleware)
    expect(httpReponse).toEqual(serverError())
  })
})
