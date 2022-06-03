import { Validation } from '../../../../presentation/protocols/validation'
import { ValidationComposite } from '../../../../validation/validator/validation.composite'
import { RequiredFieldValidation } from '../../../../validation/validator/requeried-field-validation'

export const makeAddUserPostValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['userId', 'message']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
