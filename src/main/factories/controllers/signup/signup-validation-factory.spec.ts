import { makeSignUpController } from './signup-controller-factory'
import { ValidationComposite } from '../../../../validation/validator/validation.composite'
import { Validation } from '../../../../presentation/protocols/validation'
import { RequiredFieldValidation } from '../../../../validation/validator/requeried-field-validation'
import { FieldValidation } from '../../../../validation/validator/field-validation'
import { EmailValidatorAdapter } from '../../../../infra/validators/email-validator'
import { PasswordValidatorAdapter } from '../../../../infra/validators/password-validator-adapter'
import { CompareFieldValidation } from '../../../../validation/validator/compare-field-validation'

jest.mock('../../../../validation/validator/validation.composite')

describe('makeLoginValidation', () => {
  test('Should calls validationComposite with correct values', () => {
    makeSignUpController()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new FieldValidation('email', new EmailValidatorAdapter()))
    validations.push(new FieldValidation('password', new PasswordValidatorAdapter()))
    validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
    expect(ValidationComposite).toBeCalledWith(validations)
  })
})
