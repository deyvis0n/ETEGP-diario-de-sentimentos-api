import { Router } from 'express'
import { adaptRoute } from '../adapter/express/express-router-adapter'
import { makeUserPostControllerFactory } from '../factories/controllers/user/add-user-post-controller-factory'

export default (router: Router): void => {
  router.post('/user-post', adaptRoute(makeUserPostControllerFactory()))
}
