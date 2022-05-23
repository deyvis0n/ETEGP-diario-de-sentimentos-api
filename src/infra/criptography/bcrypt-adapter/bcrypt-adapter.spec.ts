import bcrypt from 'bcrypt'
import { BcrypterAdapter } from './bcrypt-adapter'

describe('BcryptAdapter', () => {
  test('Should call hash with correct values', async () => {
    const sut = new BcrypterAdapter()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', 12)
  })
})
