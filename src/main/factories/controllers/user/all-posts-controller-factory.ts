import { AllPostsController } from '../../../../presentation/controller/user/all-posts-controller'
import { Controller } from '../../../../presentation/protocols/controller'
import { DbAllPosts } from '../../../../data/usecases/add-user-post/db-all-posts'
import { UserPostMongoRepository } from '../../../../infra/db/mongodb/user/user-post-mongo-repository'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository'

export const makeAllPostsController = (): Controller => {
  const accountMongoRepository = new AccountMongoRepository()
  const userPostMongoRepository = new UserPostMongoRepository()
  const dbAllPosts = new DbAllPosts(userPostMongoRepository, accountMongoRepository)
  return new AllPostsController(dbAllPosts)
}
