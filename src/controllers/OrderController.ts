import { Request, Response } from 'express'
import { database } from '../database/database.js'
import { randomUUID } from 'crypto'
import { z } from 'zod'

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
        const bodySchema = z.object({
            order: z.string().nonempty('Order is required'),
            price: z.number().positive()
        })
        const { order, price } = bodySchema.parse(request.body)
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
        let data = database.update('orders', id)

        if (!data) {
            return response.status(404).json({ error: 'Order not found' })
        }

        response.status(200).json(data)
    }

    remove(request: Request, response: Response) {
        const { id } = request.params
        let data = database.delete('orders', id)
        if (!data) {
            return response.status(404).json({ error: 'Order not found' })
        }
        response.status(200).send(data)
    }
}