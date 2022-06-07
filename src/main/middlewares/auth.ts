import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { adaptMiddleware } from '../adapter/express/express-middleware-adapter'

export const auth = adaptMiddleware(makeAuthMiddleware())
