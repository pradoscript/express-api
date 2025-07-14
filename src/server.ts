import express from 'express'
import { orderRoutes } from './routes/ordersRoutes'

const PORT = 3334
const app = express()
app.use(express.json())

app.use(orderRoutes)


app.listen(PORT, () => {
    console.log(`Server has been started at http://localhost:3334/`)
})