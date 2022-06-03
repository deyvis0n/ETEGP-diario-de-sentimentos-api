import { Validation } from '../../protocols/validation'
import { HttpRequest } from '../../protocols/http'
import { AllUserPosterController } from './all-user-post-controller'
import { badRequest, ok, serverError } from '../../helper/http/http-helper'
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
    userId: 'any_id'
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

  test('Should return 500 if AllUserPost throws', async () => {
    const { sut, allUserPostStub } = makeSut()
    jest.spyOn(allUserPostStub, 'find').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError())
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeRequest()
    const fakeUserPost1 = makeFakeUserPost()
    const fakeUserPost2 = makeFakeUserPost()
    const userPostArray = await sut.handle(httpRequest)
    expect(userPostArray).toEqual(ok([
      fakeUserPost1,
      fakeUserPost2
    ]))
  })
})
