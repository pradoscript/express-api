import { Router } from 'express'
import { OrderController } from '../controllers/OrderController.js'

export const ordersRoutes = Router()
const orderController = new OrderController()


ordersRoutes.get('/', orderController.index)

ordersRoutes.get('/:id', orderController.show)

ordersRoutes.post('/', orderController.create)

ordersRoutes.patch('/:id', orderController.update)

ordersRoutes.delete('/:id', orderController.remove)

