import { LoadAccountByToken, LoadAccountByTokenResult } from '../../../domain/usercase/load-account-by-token'
import { AuthMiddleware } from './auth-middleware'
import { forbidden, ok } from '../../helper/http/http-helper'
import { AccessDeniedError } from '../../erros/access-denied-error'

const makeLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: string): Promise<LoadAccountByTokenResult> {
      return { id: 'any_id' }
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

  test('Should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'load').mockReturnValueOnce(null)
    const httpRequest = {
      body: {
        accessToken: 'invalid_token'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 403 if no token is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {}
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 200 and id if success', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        accessToken: 'any_token'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({ userId: 'any_id' }))
  })
})
