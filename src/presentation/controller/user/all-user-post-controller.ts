import { badRequest, ok, serverError } from '../../helper/http/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Validation } from '../../protocols/validation'
import { AllUserPost } from '../../../domain/usercase/all-user-post'

export class AllUserPosterController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly allUserPost: AllUserPost
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { userId } = httpRequest.body
      const userPostArray = await this.allUserPost.find(userId)
      return ok(userPostArray)
    } catch (error) {
      return serverError()
    }
  }
}
