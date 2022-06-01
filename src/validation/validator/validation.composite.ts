import { Validation } from '../../presentation/protocols/validation'

export class ValidationComposite implements Validation {
  constructor (private readonly validation: Validation[]) {}
  validate (input: any): Error {
    for (const validate of this.validation) {
      const error = validate.validate(input)
      if (error) {
        return error
      }
    }
  }
}
