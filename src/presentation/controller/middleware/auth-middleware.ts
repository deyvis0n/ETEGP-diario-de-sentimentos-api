import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { LoadAccountByToken } from '../../../domain/usercase/load-account-by-token'
import { forbidden } from '../../helper/http/http-helper'
import { AccessDeniedError } from '../../erros/access-denied-error'

export class AuthMiddleware implements Controller {
  constructor (private readonly loadAccountByToken: LoadAccountByToken) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { accessToken } = httpRequest.body
    if (accessToken) {
      await this.loadAccountByToken.load(accessToken)
    }
    return forbidden(new AccessDeniedError())
  }
}
