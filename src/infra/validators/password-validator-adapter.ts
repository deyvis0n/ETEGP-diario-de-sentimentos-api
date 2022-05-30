import { PasswordValidator } from '../../validation/protocols/password-validator'

export class PasswordValidatorAdapter implements PasswordValidator {
  isValid (password: string): boolean {
    const regex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*.?;, ]).{8,16}$/
    return regex.test(password)
  }
}
