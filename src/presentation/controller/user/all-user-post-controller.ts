import { badRequest } from '../../helper/http/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Validation } from '../../protocols/validation'

export class AllUserPosterController implements Controller {
  constructor (private readonly valiudaton: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = await this.valiudaton.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    return null
  }
}
