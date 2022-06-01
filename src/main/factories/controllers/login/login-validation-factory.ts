import { ValidationComposite } from '../../../../validation/validator/validation.composite'
import { Validation } from '../../../../presentation/protocols/validation'
import { RequiredFieldValidation } from '../../../../validation/validator/requeried-field-validation'
import { FieldValidation } from '../../../../validation/validator/field-validation'
import { EmailValidatorAdapter } from '../../../../infra/validators/email-validator'
import { PasswordValidatorAdapter } from '../../../../infra/validators/password-validator-adapter'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new FieldValidation('email', new EmailValidatorAdapter()))
  validations.push(new FieldValidation('password', new PasswordValidatorAdapter()))
  return new ValidationComposite(validations)
}
