import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { LoadAccountByToken } from '../../../domain/usercase/load-account-by-token'

export class AuthMiddleware implements Controller {
  constructor (private readonly loadAccountByToken: LoadAccountByToken) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { accessToken } = httpRequest.body
    await this.loadAccountByToken.load(accessToken)
    return null
  }
}
