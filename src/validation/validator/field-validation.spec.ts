import { FieldValidator } from '../protocols/field-validator'
import { FieldValidation } from './field-validation'
import { InvalidParamError } from '../../presentation/erros/invalid-param-error'

const makeFieldValidator = (): FieldValidator => {
  class FieldValidatorStub implements FieldValidator {
    isValid (value: string): boolean {
      return true
    }
  }
  return new FieldValidatorStub()
}

interface SutTypes {
  sut: FieldValidation
  fieldValidatorStub: FieldValidator
}

const makeSut = (): SutTypes => {
  const fieldValidatorStub = makeFieldValidator()
  const sut = new FieldValidation('field', fieldValidatorStub)
  return {
    sut,
    fieldValidatorStub
  }
}

describe('FieldValidation', () => {
  test('Should calls FieldValidator with correct values', () => {
    const { sut, fieldValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(fieldValidatorStub, 'isValid')
    sut.validate({ field: 'any_field' })
    expect(isValidSpy).toBeCalledWith('any_field')
  })

  test('Should return an Error if FieldValidator return an Error', () => {
    const { sut, fieldValidatorStub } = makeSut()
    jest.spyOn(fieldValidatorStub, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate({ invalidfield: 'any_field' })
    expect(error).toEqual(new InvalidParamError('field'))
  })
})
