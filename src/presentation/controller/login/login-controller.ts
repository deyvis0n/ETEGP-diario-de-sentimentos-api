
import { Authentication } from '../../../domain/usercase/authentication'
import { EmailValidator } from '../../../validation/protocols/email-validator'
import { InvalidParamError } from '../../erros/invalid-param-error'
import { MissingParamError } from '../../erros/missing-param-error'
import { badRequest, serverError, unauthorized, ok } from '../../helper/http/http-helper'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Controller } from '../../protocols/signup'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication,
    private readonly emailValidator: EmailValidator
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { email, password } = httpRequest.body
      const isValidEmail = await this.emailValidator.isValid(email)
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }
      const accessToken = await this.authentication.auth({ email, password })
      if (!accessToken) {
        return unauthorized()
      }
      return ok(accessToken)
    } catch (error) {
      return serverError()
    }
  }
}
