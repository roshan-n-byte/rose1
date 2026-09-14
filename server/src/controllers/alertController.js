import { store } from '../config/store.js'

export function listAlerts(req, res) { let items = [...store.alerts]; if (req.query.status) items = items.filter((item) => item.status === req.query.status.toUpperCase()); if (req.query.severity) items = items.filter((item) => item.severity === req.query.severity.toUpperCase()); res.json({ success: true, data: items }) }
export function getAlert(req, res) { const item = store.alerts.find((alert) => alert.alertId === req.params.id); item ? res.json({ success: true, data: item }) : res.status(404).json({ success: false, message: 'Alert not found' }) }
function updateStatus(req, res, status) { const item = store.alerts.find((alert) => alert.alertId === req.params.id); if (!item) return res.status(404).json({ success: false, message: 'Alert not found' }); item.status = status; if (status === 'ACKNOWLEDGED') item.acknowledgedAt = new Date(); res.json({ success: true, data: item }) }
export const acknowledgeAlert = (req, res) => updateStatus(req, res, 'ACKNOWLEDGED')
export const followUpAlert = (req, res) => updateStatus(req, res, 'FOLLOW_UP')
export const resolveAlert = (req, res) => updateStatus(req, res, 'RESOLVED')
