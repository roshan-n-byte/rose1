import express from 'express'
import { personnel, alerts, trend, calculateRisk } from './mockData.js'

const app = express()
const port = process.env.PORT || 8787
app.use(express.json())

app.get('/api/dashboard', (_req, res) => {
  const counts = personnel.reduce((result, person) => {
    result[person.risk.toLowerCase()] += 1
    return result
  }, { low: 0, moderate: 0, high: 0 })
  res.json({ total: personnel.length + 412, monitored: personnel.length + 364, ...counts, trend, alerts: alerts.slice(0, 5) })
})
app.get('/api/personnel', (_req, res) => res.json(personnel))
app.get('/api/personnel/:id', (req, res) => {
  const person = personnel.find((item) => item.id === req.params.id)
  person ? res.json(person) : res.status(404).json({ message: 'Personnel record not found' })
})
app.get('/api/alerts', (_req, res) => res.json(alerts))
app.get('/api/analytics', (_req, res) => res.json({ trend, units: ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo'].map((unit) => ({ unit, low: 3, moderate: 2, high: unit === 'Bravo' ? 3 : 1 })) }))
app.post('/api/checkin', (req, res) => res.json(calculateRisk(req.body)))
app.post('/api/predict', (req, res) => res.json(calculateRisk(req.body)))
app.post('/api/alerts/:id/acknowledge', (req, res) => res.json({ success: true, id: req.params.id, status: 'Acknowledged' }))

app.listen(port, () => console.log(`API server listening on http://localhost:${port}`))
