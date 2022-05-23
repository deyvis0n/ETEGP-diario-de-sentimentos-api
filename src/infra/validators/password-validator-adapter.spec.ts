import { PasswordValidatorAdapter } from './password-validator-adapter'

describe('PasswordValidatorAdapter', () => {
  test('Should return true if a valid password is provided', () => {
    const sut = new PasswordValidatorAdapter()
    const isValid = sut.isValid('Aa@12345')
    expect(isValid).toBe(true)
  })
})
