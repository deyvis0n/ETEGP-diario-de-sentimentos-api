import { UserPostModel } from '../../../domain/model/user-post'
import { AllPosts } from '../../../domain/usercase/all-posts'
import { FindAllPosts } from '../../protocols/db/find-all-posts'

export class DbAllPosts implements AllPosts {
  constructor (private readonly findAllPosts: FindAllPosts) {}

  async findAll (): Promise<UserPostModel[]> {
    await this.findAllPosts.findAll()
    return null
  }
}
