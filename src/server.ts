import express from 'express'
import { routes } from './routes/index.js'
import { ZodError } from 'zod'
import { Request, Response, NextFunction } from 'express'

const PORT = 3334
const app = express()
app.use(express.json())

app.use(routes)
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof ZodError) {
        return response.status(400).json({ error: err.message })
    }
    return response.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
    console.log(`Server has been started at http://localhost:3334/`)
})