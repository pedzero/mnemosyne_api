import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import profileRoutes from './routes/profile.routes'
import projectRoutes from './routes/project.routes'
import { errorHandler } from './middlewares/errorHandler'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use('/profile', profileRoutes)
app.use('/projects', projectRoutes)

app.use(errorHandler)

export default app
