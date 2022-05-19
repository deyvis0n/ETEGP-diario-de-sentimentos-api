import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Controller } from '../../protocols/signup'
import { MissingParamError } from '../../erros/missing-param-error'
import { badRequest, serverError } from '../../helper/http/http-helper'
import { InvalidParamError } from '../../erros/invalid-param-error'
import { EmailValidator } from '../../../validation/protocols/email-validator'
import { AddAccount } from '../../../domain/usercase/add-account'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    try {
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { name, email, password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError(passwordConfirmation))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      await this.addAccount.add({
        name,
        email,
        password
      })
    } catch (error) {
      return serverError()
    }
  }
}
