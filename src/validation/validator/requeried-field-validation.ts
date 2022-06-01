import { MissingParamError } from '../../presentation/erros/missing-param-error'
import { Validation } from '../../presentation/protocols/validation'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly requiredField: string) {}

  validate (input: any): Error {
    if (!input[this.requiredField]) {
      return new MissingParamError(this.requiredField)
    }
    return null
  }
}
