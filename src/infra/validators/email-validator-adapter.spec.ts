import { EmailValidatorAdapter } from './email-validator'

describe('EmailValidatorAdapter', () => {
  test('Should return false if a invalid valid email is provided', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('invalid_email@mail.com')
    expect(isValid).toBe(false)
  })

  test('Should return true if a valid email is provided', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('valid.valid@aluno.educacao.pe.gov.br')
    expect(isValid).toBe(true)
  })
})
