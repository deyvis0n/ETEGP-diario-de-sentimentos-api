import env from '../../config/env'
import { DbLoadAccountByToken } from '../../../data/usecases/authentication/db-load-account-by-token'
import { JsonWebTokenAdapter } from '../../../infra/criptography/jsonwebtoken-adapter/jwt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { Middleware } from '../../../presentation/protocols/middleware'
import { AuthMiddleware } from '../../../presentation/controller/middleware/auth-middleware'

export const makeAuthMiddleware = (): Middleware => {
  const jwtAdapter = new JsonWebTokenAdapter(env.secret)
  const accountMongoRepository = new AccountMongoRepository()
  const dbLoadAccountByToken = new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
  return new AuthMiddleware(dbLoadAccountByToken)
}
