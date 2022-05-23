import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Controller } from '../../protocols/signup'
import { MissingParamError } from '../../erros/missing-param-error'
import { badRequest, serverError, ok } from '../../helper/http/http-helper'
import { InvalidParamError } from '../../erros/invalid-param-error'
import { EmailValidator } from '../../../validation/protocols/email-validator'
import { PasswordValidator } from '../../../validation/protocols/password-validator'
import { AddAccount } from '../../../domain/usercase/add-account'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount,
    private readonly passwordValidator: PasswordValidator
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
      const isValidEmail = this.emailValidator.isValid(email)
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }
      this.passwordValidator.isValid(password)
      const account = await this.addAccount.add({
        name,
        email,
        password
      })
      return ok(account)
    } catch (error) {
      return serverError()
    }
  }
}
