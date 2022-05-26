import { MissingParamError } from '../../erros/missing-param-error'
import { badRequest } from '../../helper/http/http-helper'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Controller } from '../../protocols/signup'

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['email', 'password']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    return null
  }
}
