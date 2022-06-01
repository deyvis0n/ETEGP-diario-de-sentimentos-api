import { loginPath } from './paths/login-path'
import { accountSchema } from './schemas/account-schema'
import { loguinParamsSchema } from './schemas/login-params-schema'
import { signupPath } from './paths/signup-path'
import { signupParamsSchema } from './schemas/signup-params-schema'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Diario de Sentimentos API',
    description: 'API para projeto da ETEGP',
    version: '0.0.0'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login'
  },
  {
    name: 'SignUp'
  }],
  paths: {
    '/login': loginPath,
    '/signup': signupPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loguinParamsSchema,
    signupParams: signupParamsSchema
  }
}
