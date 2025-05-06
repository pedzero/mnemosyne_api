import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import profileRoutes from './routes/profile.routes'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use('/profile', profileRoutes)

export default app
