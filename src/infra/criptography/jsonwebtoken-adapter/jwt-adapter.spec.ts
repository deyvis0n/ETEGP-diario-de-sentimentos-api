import { JsonWebTokenAdapter } from './jwt-adapter'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return 'any_token'
  }
}))

const makeSut = (): JsonWebTokenAdapter => {
  const sut = new JsonWebTokenAdapter('secret')
  return sut
}

describe('JsonWebTokenAdapter', () => {
  test('Should call JWT with correct values', async () => {
    const sut = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.generate('any_id')
    expect(signSpy).toBeCalledWith({ id: 'any_id' }, 'secret')
  })
})
