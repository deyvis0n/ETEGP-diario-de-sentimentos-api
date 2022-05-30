import { Controller } from '../../../../presentation/protocols/signup'
import { LoginController } from '../../../../presentation/controller/login/login-controller'
import { makeDbAuthentication } from '../../usecases/authentication-factory'

export const makeLoginController = (): Controller => {
  const dbAuthentication = makeDbAuthentication()
  const controller = new LoginController(dbAuthentication)
  return controller
}
