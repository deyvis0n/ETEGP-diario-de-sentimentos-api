import { makeAddUserPostValidation } from './add-user-post-validation-factory'
import { ValidationComposite } from '../../../../validation/validator/validation.composite'
import { Validation } from '../../../../presentation/protocols/validation'
import { RequiredFieldValidation } from '../../../../validation/validator/requeried-field-validation'

jest.mock('../../../../validation/validator/validation.composite')

describe('makeLoginValidation', () => {
  test('Should calls validationComposite with correct values', () => {
    makeAddUserPostValidation()
    const validations: Validation[] = []
    for (const field of ['userId', 'message']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toBeCalledWith(validations)
  })
})
