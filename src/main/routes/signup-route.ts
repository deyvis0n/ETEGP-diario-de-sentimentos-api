import { Router } from 'express'
import { adaptRoute } from '../adapter/express/express-router-adapter'
import { makeSignUpController } from '../factories/controllers/signup/signup-controller-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
}
