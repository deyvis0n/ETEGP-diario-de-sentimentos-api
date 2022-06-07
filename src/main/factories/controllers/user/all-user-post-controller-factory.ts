import { Controller } from '../../../../presentation/protocols/controller'
import { AllUserPosterController } from '../../../../presentation/controller/user/all-user-post-controller'
import { DbAllUserPost } from '../../../../data/usecases/add-user-post/db-all-user-post'
import { makeAllUserPostVallidation } from './all-user-post-validation-factory'
import { UserPostMongoRepository } from '../../../../infra/db/mongodb/user/user-post-mongo-repository'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository'

export const makeAllUserPostController = (): Controller => {
  const userPostMongoRepository = new UserPostMongoRepository()
  const accountMongoRepository = new AccountMongoRepository()
  const dbAllUserPost = new DbAllUserPost(userPostMongoRepository, accountMongoRepository)
  return new AllUserPosterController(makeAllUserPostVallidation(), dbAllUserPost)
}
