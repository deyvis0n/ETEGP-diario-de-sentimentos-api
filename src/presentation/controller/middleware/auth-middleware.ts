import { Middleware } from '../../protocols/middleware'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { LoadAccountByToken } from '../../../domain/usercase/load-account-by-token'
import { forbidden, ok, serverError } from '../../helper/http/http-helper'
import { AccessDeniedError } from '../../erros/access-denied-error'

export class AuthMiddleware implements Middleware {
  constructor (private readonly loadAccountByToken: LoadAccountByToken) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { accessToken } = httpRequest.body
      if (accessToken) {
        const account = await this.loadAccountByToken.load(accessToken)
        if (account) {
          return ok({ userId: account.id })
        }
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError()
    }
  }
}
