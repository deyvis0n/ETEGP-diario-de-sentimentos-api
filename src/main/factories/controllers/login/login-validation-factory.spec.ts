import { makeLoginValidation } from './login-validation-factory'
import { ValidationComposite } from '../../../../validation/validator/validation.composite'
import { Validation } from '../../../../presentation/protocols/validation'
import { RequiredFieldValidation } from '../../../../validation/validator/requeried-field-validation'

jest.mock('../../../../validation/validator/validation.composite')

describe('makeLoginValidation', () => {
  test('Should calls validationComposite with correct values', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toBeCalledWith(validations)
  })
})
