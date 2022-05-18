import { HttpRequest, HttpResponse } from '../protocols/http'
import { Controller } from '../protocols/signup'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return { statusCode: 400, body: '' }
      }
    }
    const { password, passwordConfirmation } = httpRequest.body
    if (password !== passwordConfirmation) {
      return { statusCode: 400, body: '' }
    }
  }
}
