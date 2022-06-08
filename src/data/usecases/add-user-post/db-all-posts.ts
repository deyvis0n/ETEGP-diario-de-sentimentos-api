import { UserPostModel } from '../../../domain/model/user-post'
import { AllPosts } from '../../../domain/usercase/all-posts'
import { FindAllPosts } from '../../protocols/db/find-all-posts'
import { LoadAccountByIdRepository } from '../../protocols/db/load-account-by-id-repository'

export class DbAllPosts implements AllPosts {
  constructor (
    private readonly findAllPosts: FindAllPosts,
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository
  ) {}

  async findAll (): Promise<UserPostModel[]> {
    const arrayPost = await this.findAllPosts.findAll()
    if (arrayPost.length !== 0) {
      const arrayPostWithName = []
      for (const post of arrayPost) {
        const account = await this.loadAccountByIdRepository.loadById(post.id)
        arrayPostWithName.push(Object.assign(post, { userName: account.name }))
      }
      return arrayPostWithName
    }
    return []
  }
}
