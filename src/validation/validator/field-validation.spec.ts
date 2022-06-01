import { FieldValidator } from '../protocols/field-validator'
import { FieldValidation } from './field-validation'

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
})
