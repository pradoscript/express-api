import { Router } from 'express'
import { ordersRoutes } from './ordersRoutes.js'

const routes = Router()

routes.use('/orders', ordersRoutes)

export { routes }