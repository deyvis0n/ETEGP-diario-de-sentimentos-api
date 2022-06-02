import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { AddUserPost } from '../../../domain/usercase/add-user-post'
import { Validation } from '../../protocols/validation'
import { badRequest } from '../../helper/http/http-helper'

export class AddUserPostController implements Controller {
  constructor (
    private readonly addUserPost: AddUserPost,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    await this.addUserPost.add(httpRequest.body)
    return null
  }
}
