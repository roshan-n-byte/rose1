import { store } from '../config/store.js'
import { calculateRisk } from '../services/riskEngine.js'

export function createPrediction(req, res) { const result = calculateRisk(req.body); const prediction = { id: `PRED-${Date.now()}`, personnelId: req.body.personnelId, ...result, createdAt: new Date() }; store.predictions.push(prediction); res.status(201).json({ success: true, data: prediction, disclaimer: result.disclaimer }) }
export function listPredictions(req, res) { res.json({ success: true, data: store.predictions.filter((item) => item.personnelId === req.params.personnelId) }) }
