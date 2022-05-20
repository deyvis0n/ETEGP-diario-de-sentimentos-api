import { EmailValidatorAdapter } from './email-validator'

describe('EmailValidatorAdapter', () => {
  test('Should return false if a invalid valid email is provided', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('invalid_email@mail.com')
    expect(isValid).toBe(false)
  })
})
