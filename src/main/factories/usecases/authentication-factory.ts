import { Authentication } from '../../../domain/usercase/authentication'
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { BcrypterAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JsonWebTokenAdapter } from '../../../infra/criptography/jsonwebtoken-adapter/jwt-adapter'
import env from '../../config/env'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const bcrypterAdapter = new BcrypterAdapter(salt)
  const jsonWebTokenAdapter = new JsonWebTokenAdapter(env.secret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAuthentication(accountMongoRepository, bcrypterAdapter, jsonWebTokenAdapter, accountMongoRepository)
}
