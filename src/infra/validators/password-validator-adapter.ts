import { PasswordValidator } from '../../validation/protocols/password-validator'

export class PasswordValidatorAdapter implements PasswordValidator {
  isValid (password: string): boolean {
    const regex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*.?;,+-= ]).{8,16}$/
    return regex.test(password)
  }
}
