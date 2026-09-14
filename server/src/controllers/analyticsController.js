import { dashboard, series } from '../services/analyticsService.js'
export function getDashboard(_req, res) { res.json({ success: true, data: dashboard(), disclaimer: 'AI-generated indicators are decision-support signals and are not medical diagnoses.' }) }
export const getStress = (_req, res) => res.json({ success: true, data: series('stress') })
export const getFatigue = (_req, res) => res.json({ success: true, data: series('fatigue') })
export const getWorkload = (_req, res) => res.json({ success: true, data: series('workload') })
export const getWelfare = (_req, res) => res.json({ success: true, data: series('welfare') })
export const getUnits = (_req, res) => res.json({ success: true, data: dashboard().unitStatistics })
export const getWeekly = (_req, res) => res.json({ success: true, data: dashboard().weeklyTrends })
