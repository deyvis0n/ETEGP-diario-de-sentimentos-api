import { InvalidParamError } from '../../presentation/erros/invalid-param-error'
import { Validation } from '../../presentation/protocols/validation'
import { FieldValidator } from '../protocols/field-validator'

export class FieldValidation implements Validation {
  constructor (
    private readonly field: string,
    private readonly fieldValidator: FieldValidator
  ) {}

  validate (input: any): Error {
    const isValid = this.fieldValidator.isValid(input[this.field])
    if (!isValid) {
      return new InvalidParamError(this.field)
    }
    return null
  }
}
