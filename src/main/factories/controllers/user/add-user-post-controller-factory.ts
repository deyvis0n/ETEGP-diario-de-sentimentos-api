import { Controller } from '../../../../presentation/protocols/controller'
import { AddUserPostController } from '../../../../presentation/controller/user/add-user-post-controller'
import { makeAddUserPostValidation } from './add-user-post-validation-factory'
import { DbAddAccountUserPost } from '../../../../data/usecases/add-user-post/db-add-user-post'
import { UserPostMongoRepository } from '../../../../infra/db/mongodb/user/user-post-mongo-repository'

export const makeUserPostController = (): Controller => {
  const userPostMongoRepository = new UserPostMongoRepository()
  const dbAddAccountUserPost = new DbAddAccountUserPost(userPostMongoRepository)
  const controller = new AddUserPostController(dbAddAccountUserPost, makeAddUserPostValidation())
  return controller
}
