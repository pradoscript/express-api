import { Request, Response } from 'express'
import { database } from '../database/database.js'
import { randomUUID } from 'crypto'

export class OrderController {

    show(request: Request, response: Response) {
        const { id } = request.params
        let data = database.select('orders', { id })
        if (data.length === 0) {
            return response.status(404).json({ error: 'Order not found' })
        }
        response.status(200).json(data[0])
    }

    index(request: Request, response: Response) {

        const status = request.query.status
        const filters = typeof status === 'string' ? { status } : undefined
        const data = database.select('orders', filters)
        response.status(200).json(data)
    }

    create(request: Request, response: Response) {
        const { order, price } = request.body
        const newOrder = {
            id: randomUUID(),
            order: order,
            price,
            status: 'open'
        }

        database.create('orders', newOrder)
        response.status(201).json(newOrder)
    }

    update(request: Request, response: Response) {
        const { id } = request.params
        database.update('orders', id)
        response.status(200).json({ message: 'Order updated successfully' })
    }

    remove(request: Request, response: Response) {
        const { id } = request.params
        let data = database.delete('orders', id)
        response.status(200).send(data)
    }
}