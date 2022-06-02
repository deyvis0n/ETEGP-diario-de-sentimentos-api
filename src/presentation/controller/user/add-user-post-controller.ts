import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { AddUserPost } from '../../../domain/usercase/add-user-post'
import { Validation } from '../../protocols/validation'
import { badRequest, serverError } from '../../helper/http/http-helper'

export class AddUserPostController implements Controller {
  constructor (
    private readonly addUserPost: AddUserPost,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { userId, message } = httpRequest.body
      await this.addUserPost.add({
        userId,
        message
      })
      return null
    } catch (error) {
      return serverError()
    }
  }
}
