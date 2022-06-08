import { Router } from 'express'
import { adaptRoute } from '../adapter/express/express-router-adapter'
import { makeUserPostController } from '../factories/controllers/user/add-user-post-controller-factory'
import { makeAllUserPostController } from '../factories/controllers/user/all-user-post-controller-factory'
import { makeAllPostsController } from '../factories/controllers/user/all-posts-controller-factory'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/user-post', auth, adaptRoute(makeUserPostController()))
  router.get('/user-post', auth, adaptRoute(makeAllUserPostController()))
  router.get('/all-post', auth, adaptRoute(makeAllPostsController()))
}
