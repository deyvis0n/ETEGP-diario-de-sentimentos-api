import { Controller } from '../../../../presentation/protocols/controller'
import { SignUpController } from '../../../../presentation/controller/signup/signup-controller'
import { DbAddAccount } from '../../../../data/usecases/add-account/db-add-account'
import { BcrypterAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository'
import { makeDbAuthentication } from '../../usecases/authentication-factory'
import { makeLoginValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const hash = new BcrypterAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(hash, accountMongoRepository, accountMongoRepository)
  const dbAuthentication = makeDbAuthentication()
  const controller = new SignUpController(dbAddAccount, dbAuthentication, makeLoginValidation())
  return controller
}
