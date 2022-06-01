import { Validation } from '../../presentation/protocols/validation'
import { InvalidParamError } from '../../presentation/erros/invalid-param-error'

export class CompareFieldValidation implements Validation {
  constructor (
    private readonly field: string,
    private readonly compareField: string
  ) {}

  validate (input: any): Error {
    if (input[this.field] !== input[this.compareField]) {
      return new InvalidParamError(this.compareField)
    }
    return null
  }
}
