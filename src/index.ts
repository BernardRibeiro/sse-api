import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { EventController, SendEventController } from './controllers'

const PORT = 8888

const app = express()

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.get('/events', EventController)
app.post('/send-event', SendEventController)

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))
