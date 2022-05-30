import { Router } from 'express'
import { adaptRoute } from '../adapter/express/express-router-adapter'
import { makeLoginController } from '../factories/controllers/login/login-controller-factory'

export default (router: Router): void => {
  router.post('/login', adaptRoute(makeLoginController()))
}
