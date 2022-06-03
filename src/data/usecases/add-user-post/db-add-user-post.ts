import { AddUserPost, AddUserPostModel } from '../../../domain/usercase/add-user-post'
import { AddUserPostRepository } from '../../protocols/db/add-user-post-repository'

export class DbAddAccountUserPost implements AddUserPost {
  constructor (private readonly addUserPostRepository: AddUserPostRepository) {}

  async add (userPost: AddUserPostModel): Promise<void> {
    await this.addUserPostRepository.add(userPost)
    return null
  }
}
