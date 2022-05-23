import bcrypt from 'bcrypt'
import { BcrypterAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return 'hash'
  }
}))

describe('BcryptAdapter', () => {
  test('Should call hash with correct values', async () => {
    const sut = new BcrypterAdapter()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', 12)
  })

  test('Should return a valid hash on hash success', async () => {
    const sut = new BcrypterAdapter()
    const hash = await sut.hash('any_value')
    expect(hash).toBe('hash')
  })
})
