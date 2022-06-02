import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { AddUserPost } from '../../../domain/usercase/add-user-post'

export class AddUserPostController implements Controller {
  constructor (private readonly addUserPost: AddUserPost) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.addUserPost.add(httpRequest.body)
    return null
  }
}
