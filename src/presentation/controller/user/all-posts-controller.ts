import { AllPosts } from '../../../domain/usercase/all-posts'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class AllPostsController implements Controller {
  constructor (private readonly allPosts: AllPosts) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.allPosts.findAll()
    return null
  }
}
