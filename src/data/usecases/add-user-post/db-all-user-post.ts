import { UserPostModel } from '../../../domain/model/user-post'
import { AllUserPost } from '../../../domain/usercase/all-user-post'
import { FindAllUserPostByUseIdRepository } from '../../protocols/db/find-all-user-post-by-user-id'

export class DbAllUserPost implements AllUserPost {
  constructor (private readonly findAllUserPostByUseIdRepository: FindAllUserPostByUseIdRepository) {}

  async find (userId: string): Promise<UserPostModel[]> {
    await this.findAllUserPostByUseIdRepository.findByUserId(userId)
    return null
  }
}
