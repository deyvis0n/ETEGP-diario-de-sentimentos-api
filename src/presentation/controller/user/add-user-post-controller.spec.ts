import { AddUserPostModel, AddUserPost } from '../../../domain/usercase/add-user-post'
import { AddUserPostController } from './add-user-post-controller'
import { Validation } from '../../protocols/validation'
import { HttpRequest } from '../../protocols/http'
import { badRequest, serverError } from '../../helper/http/http-helper'

const makeAddUserPost = (): AddUserPost => {
  class AddUserPostStub implements AddUserPost {
    async add (userPost: AddUserPostModel): Promise<void> {}
  }
  return new AddUserPostStub()
}

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
    id: 'any_id',
    message: 'any_message'
  }
})

interface SutTypes {
  sut: AddUserPostController
  addUserPostStub: AddUserPost
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const addUserPostStub = makeAddUserPost()
  const validationStub = makeValidation()
  const sut = new AddUserPostController(addUserPostStub, validationStub)
  return {
    sut,
    addUserPostStub,
    validationStub
  }
}

describe('AddUserPostController', () => {
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

  test('Should call AddUserPost with correct values', async () => {
    const { sut, addUserPostStub } = makeSut()
    const addSpy = jest.spyOn(addUserPostStub, 'add')
    const httpRequest = ({
      body: {
        id: 'any_id',
        message: 'any_message'
      }
    })
    await sut.handle(httpRequest)
    expect(addSpy).toBeCalledWith(httpRequest.body)
  })

  test('Should return 500 if AddUserPost throws', async () => {
    const { sut, addUserPostStub } = makeSut()
    jest.spyOn(addUserPostStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError())
  })
})
