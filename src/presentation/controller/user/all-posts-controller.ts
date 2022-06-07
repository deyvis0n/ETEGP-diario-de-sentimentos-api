import { AllPosts } from '../../../domain/usercase/all-posts'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { ok } from '../../helper/http/http-helper'

export class AllPostsController implements Controller {
  constructor (private readonly allPosts: AllPosts) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const postArray = await this.allPosts.findAll()
    return ok(postArray)
  }
}
