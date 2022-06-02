import { Controller } from '../../../../presentation/protocols/controller'
import { LoginController } from '../../../../presentation/controller/login/login-controller'
import { makeDbAuthentication } from '../../usecases/authentication-factory'
import { makeLoginValidation } from './login-validation-factory'

export const makeLoginController = (): Controller => {
  const dbAuthentication = makeDbAuthentication()
  const controller = new LoginController(dbAuthentication, makeLoginValidation())
  return controller
}
