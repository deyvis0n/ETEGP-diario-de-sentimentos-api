import express from 'express'
import setupMiddleware from './middlewares'
import setubSwagger from './swagger'
import setupRoutes from './router'

const app = express()
setubSwagger(app)
setupMiddleware(app)
setupRoutes(app)
export default app
