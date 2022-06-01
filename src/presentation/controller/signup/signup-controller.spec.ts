import { SignUpController } from './signup-controller'
import { EmailInUseError } from '../../erros/email-in-use-error'
import { badRequest, serverError, ok, forbidden } from '../../helper/http/http-helper'
import { InvalidParamError } from '../../erros/invalid-param-error'
import { HttpRequest } from '../../protocols/http'
import { AddAccount, AddAccountModel } from '../../../domain/usercase/add-account'
import { AccountModel } from '../../../domain/model/account'
import { Authentication, AuthenticationModel, Result } from '../../../domain/usercase/authentication'
import { Validation } from '../../protocols/validation'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: AuthenticationModel): Promise<Result> {
      return { name: 'any_name', accessToken: 'any_token' }
    }
  }
  return new AuthenticationStub()
}

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email',
  password: 'any_password'
})

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountModel): Promise<AccountModel> {
      return await new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new AddAccountStub()
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'valid_name',
    email: 'valid_email@mail.com',
    password: 'valid_password',
    passwordConfirmation: 'valid_password'
  }
})

interface SutTypes {
  sut: SignUpController
  addAccount: AddAccount
  authenticationStub: Authentication
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const addAccount = makeAddAccount()
  const authenticationStub = makeAuthentication()
  const validationStub = makeValidation()
  const sut = new SignUpController(
    addAccount,
    authenticationStub,
    validationStub
  )
  return {
    sut,
    addAccount,
    authenticationStub,
    validationStub
  }
}

describe('SignUpController', () => {
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

  test('Should return 400 if password and passwordConfirmation is no equals', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_password',
        passwordConfirmation: 'invalid_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('passwordConfirmation')))
  })

  test('Should AddAccount calls with correct values', async () => {
    const { sut, addAccount } = makeSut()
    const addSpy = jest.spyOn(addAccount, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toBeCalledWith({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    })
  })

  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccount } = makeSut()
    jest.spyOn(addAccount, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError())
  })

  test('Should return 403 if AddAccount returns null', async () => {
    const { sut, addAccount } = makeSut()
    jest.spyOn(addAccount, 'add').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(makeFakeRequest())
    expect(authSpy).toBeCalledWith({
      email: 'valid_email@mail.com',
      password: 'valid_password'
    })
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(() => { throw new Error() })
    const httpReponse = await sut.handle(makeFakeRequest())
    expect(httpReponse).toEqual(serverError())
  })

  test('Should returns 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok({ name: 'any_name', accessToken: 'any_token' }))
  })
})
