import { Validation } from '../../protocols/validation'
import { HttpRequest } from '../../protocols/http'
import { AllUserPosterController } from './all-user-post-controller'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    id: 'any_id'
  }
})

interface SutTypes {
  sut: AllUserPosterController
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const sut = new AllUserPosterController(validationStub)
  return {
    sut,
    validationStub
  }
}

describe('AllUserPosterController', () => {
  test('Should calls Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toBeCalledWith(httpRequest.body)
  })
})
