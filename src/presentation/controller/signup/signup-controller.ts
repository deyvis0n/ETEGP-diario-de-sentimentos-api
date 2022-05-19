import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Controller } from '../../protocols/signup'
import { MissingParamError } from '../../erros/missing-param-error'
import { badRequest } from '../../helper/http/http-helper'
import { InvalidParamError } from '../../erros/invalid-param-error'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    const { password, passwordConfirmation } = httpRequest.body
    if (password !== passwordConfirmation) {
      return badRequest(new InvalidParamError(passwordConfirmation))
    }
  }
}
