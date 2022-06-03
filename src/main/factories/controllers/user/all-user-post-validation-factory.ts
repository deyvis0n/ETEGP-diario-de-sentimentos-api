import { Validation } from '../../../../presentation/protocols/validation'
import { ValidationComposite } from '../../../../validation/validator/validation.composite'
import { RequiredFieldValidation } from '../../../../validation/validator/requeried-field-validation'

export const makeAllUserPostVallidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['userId']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
