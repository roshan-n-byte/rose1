import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'
import authRoutes from './routes/authRoutes.js'
import personnelRoutes from './routes/personnelRoutes.js'
import checkinRoutes from './routes/checkinRoutes.js'
import predictionRoutes from './routes/predictionRoutes.js'
import alertRoutes from './routes/alertRoutes.js'
import analyticsRoutes from './routes/analyticsRoutes.js'
import assistantRoutes from './routes/assistantRoutes.js'
import { requireAuth } from './middleware/authMiddleware.js'
import { store } from './config/store.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import { dashboard } from './services/analyticsService.js'
import { listAlerts } from './controllers/alertController.js'
import { listPersonnel } from './controllers/personnelController.js'
import { createCheckin } from './controllers/checkinController.js'
import { calculateRisk } from './services/riskEngine.js'

export const app = express()
app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: 'draft-7', legacyHeaders: false }))
app.use(express.json({ limit: '100kb' }))
app.use(morgan('tiny'))
app.get('/api/health', (_req, res) => res.json({ success: true, message: 'AI Welfare Monitoring API is running', database: store.database }))
app.use('/api/auth', authRoutes)
app.use('/api/personnel', personnelRoutes)
app.use('/api/checkins', checkinRoutes)
app.use('/api/predictions', predictionRoutes)
app.use('/api/alerts', alertRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/assistant', assistantRoutes)

// Compatibility endpoints keep the existing prototype frontend usable during migration.
app.get('/api/dashboard', (_req, res) => { const data = dashboard(); res.json({ total: data.totalPersonnel + 412, monitored: data.monitoredPersonnel + 364, low: data.lowRisk, moderate: data.moderateRisk, high: data.highRisk, trend: store.trend, alerts: store.alerts.slice(0, 5) }) })
app.get('/api/personnel', (req, res) => listPersonnel(req, res))
app.get('/api/personnel/:id', (req, res) => { req.params.id && import('./controllers/personnelController.js').then(({ getPersonnel }) => getPersonnel(req, res)) })
app.get('/api/alerts', (req, res) => listAlerts(req, res))
app.get('/api/analytics', (_req, res) => res.json({ trend: store.trend, units: dashboard().unitStatistics }))
app.post('/api/checkin', (req, res) => res.json(calculateRisk(req.body)))
app.post('/api/predict', (req, res) => res.json(calculateRisk(req.body)))
app.use(notFound)
app.use(errorHandler)
