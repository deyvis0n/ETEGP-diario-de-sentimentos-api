import { InvalidParamError } from '../../presentation/erros/invalid-param-error'
import { CompareFieldValidation } from './compare-field-validation'

describe('CompareFieldValidation', () => {
  test('Should return InvalidParamError if validate fails', () => {
    const sut = new CompareFieldValidation('field', 'compareField')
    const error = sut.validate({ field: 'valid_field', compareField: 'invalid_field' })
    expect(error).toEqual(new InvalidParamError('compareField'))
  })

  test('Should return null if validate success', () => {
    const sut = new CompareFieldValidation('field', 'compareField')
    const error = sut.validate({ field: 'valid_field', compareField: 'valid_field' })
    expect(error).toBeNull()
  })
})
