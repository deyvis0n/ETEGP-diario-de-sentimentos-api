import { Validation } from '../../presentation/protocols/validation'
import { ValidationComposite } from './validation.composite'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

interface sutTypes {
  sut: ValidationComposite
  validationStub: Validation[]
}

const makeSut = (): sutTypes => {
  const validationStub = [
    makeValidation(),
    makeValidation()
  ]
  const sut = new ValidationComposite(validationStub)
  return {
    sut,
    validationStub
  }
}

describe('ValidationComposite', () => {
  test('Should return error if any validation return error', () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub[0], 'validate').mockReturnValueOnce(new Error())
    const error = sut.validate({ field: 'any_field ' })
    expect(error).toEqual(Error())
  })
})
