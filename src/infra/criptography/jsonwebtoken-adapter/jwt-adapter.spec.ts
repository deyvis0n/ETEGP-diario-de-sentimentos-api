import { JsonWebTokenAdapter } from './jwt-adapter'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return 'any_token'
  },

  async verify (): Promise<string> {
    return 'any_id'
  }
}))

const makeSut = (): JsonWebTokenAdapter => {
  const sut = new JsonWebTokenAdapter('secret')
  return sut
}

describe('JsonWebTokenAdapter', () => {
  test('Should call encrypt with correct values', async () => {
    const sut = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_id')
    expect(signSpy).toBeCalledWith({ id: 'any_id' }, 'secret')
  })

  test('Should return throws if encrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error()
    })
    const accessToken = sut.encrypt('any_id')
    await expect(accessToken).rejects.toThrow()
  })

  test('Should return a token on encrypt success', async () => {
    const sut = makeSut()
    const accessToken = await sut.encrypt('any_id')
    expect(accessToken).toBe('any_token')
  })

  test('Should call decrypt with correct values', async () => {
    const sut = makeSut()
    const verifySpy = jest.spyOn(jwt, 'verify')
    await sut.decrypt('any_token')
    expect(verifySpy).toBeCalledWith('any_token', 'secret')
  })

  test('Should return throws if decrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
      throw new Error()
    })
    const token = sut.decrypt('any_token')
    await expect(token).rejects.toThrow()
  })

  test('Should return a id on decrypt success', async () => {
    const sut = makeSut()
    const token = await sut.decrypt('any_token')
    expect(token).toBe('any_id')
  })
})
