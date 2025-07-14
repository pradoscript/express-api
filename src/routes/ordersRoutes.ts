import { Router } from 'express'
import { OrderController } from '../controllers/OrderController.js'

export const orderRoutes = Router()
const orderController = new OrderController()


orderRoutes.get('/orders', orderController.index)

orderRoutes.get('/orders/:id', orderController.show)

orderRoutes.post('/orders', orderController.create)

orderRoutes.patch('/orders/:id', orderController.update)

orderRoutes.delete('/orders/:id', orderController.remove)

