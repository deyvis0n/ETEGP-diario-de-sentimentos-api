import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Controller } from '../../protocols/signup'
import { badRequest, serverError, ok, forbidden } from '../../helper/http/http-helper'
import { InvalidParamError } from '../../erros/invalid-param-error'
import { EmailValidator } from '../../../validation/protocols/email-validator'
import { PasswordValidator } from '../../../validation/protocols/password-validator'
import { AddAccount } from '../../../domain/usercase/add-account'
import { EmailInUseError } from '../../erros/email-in-use-error'
import { Authentication } from '../../../domain/usercase/authentication'
import { Validation } from '../../protocols/validation'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount,
    private readonly passwordValidator: PasswordValidator,
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValidEmail = this.emailValidator.isValid(email)
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }
      const isValidPassword = this.passwordValidator.isValid(password)
      if (!isValidPassword) {
        return badRequest(new InvalidParamError('password'))
      }
      const account = await this.addAccount.add({
        name,
        email,
        password
      })
      if (!account) {
        return forbidden(new EmailInUseError())
      }
      const accessToken = await this.authentication.auth({
        email,
        password
      })
      return ok(accessToken)
    } catch (error) {
      return serverError()
    }
  }
}
