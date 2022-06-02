import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { AddUserPost } from '../../../domain/usercase/add-user-post'
import { Validation } from '../../protocols/validation'

export class AddUserPostController implements Controller {
  constructor (
    private readonly addUserPost: AddUserPost,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    await this.addUserPost.add(httpRequest.body)
    return null
  }
}
