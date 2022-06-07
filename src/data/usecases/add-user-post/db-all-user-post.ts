import { UserPostModel } from '../../../domain/model/user-post'
import { AllUserPost } from '../../../domain/usercase/all-user-post'
import { FindAllUserPostByUseIdRepository } from '../../protocols/db/find-all-user-post-by-user-id'
import { LoadAccountByIdRepository } from '../../protocols/db/load-account-by-id-repository'

export class DbAllUserPost implements AllUserPost {
  constructor (
    private readonly findAllUserPostByUseIdRepository: FindAllUserPostByUseIdRepository,
    private readonly loadAccountByIdRepositoryStub: LoadAccountByIdRepository
  ) {}

  async find (userId: string): Promise<UserPostModel[]> {
    const userPostArray = await this.findAllUserPostByUseIdRepository.findByUserId(userId)
    if (userPostArray.length !== 0) {
      const userPostArrayWithName = []
      const { name } = await this.loadAccountByIdRepositoryStub.loadById(userPostArray[0].userId)
      for (const post of userPostArray) {
        userPostArrayWithName.push(Object.assign(post, { userName: name }))
      }
      return userPostArrayWithName
    }
    return userPostArray
  }
}
