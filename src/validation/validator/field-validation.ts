import { Validation } from '../../presentation/protocols/validation'
import { FieldValidator } from '../protocols/field-validator'

export class FieldValidation implements Validation {
  constructor (
    private readonly field: string,
    private readonly fieldValidator: FieldValidator
  ) {}

  validate (input: any): Error {
    this.fieldValidator.isValid(input[this.field])
    return null
  }
}
