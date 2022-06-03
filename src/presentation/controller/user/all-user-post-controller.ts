import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Validation } from '../../protocols/validation'

export class AllUserPosterController implements Controller {
  constructor (private readonly valiudaton: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.valiudaton.validate(httpRequest.body)
    return null
  }
}
