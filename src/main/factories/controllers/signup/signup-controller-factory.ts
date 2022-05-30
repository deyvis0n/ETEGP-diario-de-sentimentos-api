import { Controller } from '../../../../presentation/protocols/signup'
import { SignUpController } from '../../../../presentation/controller/signup/signup-controller'
import { DbAddAccount } from '../../../../data/usecases/add-account/db-add-account'
import { EmailValidatorAdapter } from '../../../../infra/validators/email-validator'
import { PasswordValidatorAdapter } from '../../../../infra/validators/password-validator-adapter'
import { BcrypterAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const hash = new BcrypterAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(hash, accountMongoRepository, accountMongoRepository)
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const passwordValidatorAdapter = new PasswordValidatorAdapter()
  const controller = new SignUpController(emailValidatorAdapter, dbAddAccount, passwordValidatorAdapter)
  return controller
}
