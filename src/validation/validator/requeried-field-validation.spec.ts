import { MissingParamError } from '../../presentation/erros/missing-param-error'
import { RequiredFieldValidation } from './requeried-field-validation'

describe('RequiredFieldValidation', () => {
  test('Should return an Error if required field is not provided', () => {
    const sut = new RequiredFieldValidation('field')
    const error = sut.validate({ invalidField: 'field' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should return null if required field is provided', () => {
    const sut = new RequiredFieldValidation('field')
    const error = sut.validate({ field: 'field' })
    expect(error).toBeNull()
  })
})
