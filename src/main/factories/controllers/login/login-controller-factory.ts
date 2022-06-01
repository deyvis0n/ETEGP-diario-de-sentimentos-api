import { Controller } from '../../../../presentation/protocols/signup'
import { LoginController } from '../../../../presentation/controller/login/login-controller'
import { makeDbAuthentication } from '../../usecases/authentication-factory'
import { EmailValidatorAdapter } from '../../../../infra/validators/email-validator'
import { makeLoginValidation } from './login-validation-factory'

export const makeLoginController = (): Controller => {
  const dbAuthentication = makeDbAuthentication()
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const controller = new LoginController(dbAuthentication, emailValidatorAdapter, makeLoginValidation())
  return controller
}
