import { FieldValidator } from '../../validation/protocols/field-validator'

export class PasswordValidatorAdapter implements FieldValidator {
  isValid (password: string): boolean {
    const regex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*.?;, ]).{8,16}$/
    return regex.test(password)
  }
}
