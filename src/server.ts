import express from 'express'
import { routes } from './routes/index.js'

const PORT = 3334
const app = express()
app.use(express.json())

app.use(routes)


app.listen(PORT, () => {
    console.log(`Server has been started at http://localhost:3334/`)
})