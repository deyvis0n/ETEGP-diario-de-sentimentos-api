import { Controller } from '../../../../presentation/protocols/signup'
import { LoginController } from '../../../../presentation/controller/login/login-controller'
import { DbAuthentication } from '../../../../data/usecases/authentication/db-authentication'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository'
import { BcrypterAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JsonWebTokenAdapter } from '../../../../infra/criptography/jsonwebtoken-adapter/jwt-adapter'
import env from '../../../config/env'

export const makeLoginController = (): Controller => {
  const salt = 12
  const secret = env.secret
  const encrypter = new JsonWebTokenAdapter(secret)
  const hashCompare = new BcrypterAdapter(salt)
  const accountRepository = new AccountMongoRepository()
  const dbAuthentication = new DbAuthentication(accountRepository, hashCompare, encrypter, accountRepository)
  const controller = new LoginController(dbAuthentication)
  return controller
}
