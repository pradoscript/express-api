import express from 'express'

const PORT = 3333
const app = express()

app.get('/orders', (request, response) => {
    const { status } = request.query
    response.send('Orders List')
})

app.get('orders/:id', (request, response) => {
    const { id } = request.params
    response.send(`Order ID: ${id}`)
})

app.post('orders/', (request, response) => {
    response.send('Order sent!')
})

app.patch('orders/:id', (request, response) => {
    response.send('Order updated!')
})



app.listen(PORT, () => {
    console.log(`Server has been started at http://localhost:3333/`)
})