import { Validation } from '../../protocols/validation'
import { HttpRequest } from '../../protocols/http'
import { AllUserPosterController } from './all-user-post-controller'
import { badRequest } from '../../helper/http/http-helper'
import { AllUserPost } from '../../../domain/usercase/all-user-post'
import { UserPostModel } from '../../../domain/model/user-post'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeAllUserPost = (): AllUserPost => {
  class AllUserPostStub implements AllUserPost {
    async find (id: string): Promise<UserPostModel[]> {
      return [
        makeFakeUserPost(),
        makeFakeUserPost()
      ]
    }
  }
  return new AllUserPostStub()
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    id: 'any_id'
  }
})

const makeFakeUserPost = (): UserPostModel => ({
  id: 'any_id',
  userId: 'any_user_id',
  message: 'any_message',
  date: new Date(2022, 1, 1)
})

interface SutTypes {
  sut: AllUserPosterController
  validationStub: Validation
  allUserPostStub: AllUserPost
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const allUserPostStub = makeAllUserPost()
  const sut = new AllUserPosterController(validationStub, allUserPostStub)
  return {
    sut,
    validationStub,
    allUserPostStub
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

  test('Should return 400 if Validation returns an Error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(Error()))
  })

  test('Should call AllUserPost with correct values', async () => {
    const { sut, allUserPostStub } = makeSut()
    const findSpy = jest.spyOn(allUserPostStub, 'find')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(findSpy).toBeCalledWith('any_id')
  })
})
