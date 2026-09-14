import { alerts, personnel, trend } from '../../mockData.js'

export const store = {
  users: [],
  personnel: personnel.map((item) => ({ personnelId: item.id, name: item.name, unit: `${item.unit} Unit`, role: item.role, serviceYears: 2 + (item.id.charCodeAt(3) % 15), workloadScore: item.workload, fatigueScore: item.fatigue, stressScore: item.stress, welfareScore: item.welfare === 'Stable' ? 82 : item.risk === 'Moderate' ? 61 : 38, riskScore: item.risk === 'High' ? 78 : item.risk === 'Moderate' ? 54 : 28, riskLevel: item.risk.toUpperCase(), lastCheckin: new Date(Date.now() - (Number.parseInt(item.lastCheckin) || 1) * 3600000), createdAt: new Date(), updatedAt: new Date() })),
  checkins: [],
  predictions: [],
  alerts: alerts.map((item) => ({ alertId: item.id, personnelId: item.personnelId, type: item.type.toUpperCase(), severity: item.severity === 'Moderate' ? 'MEDIUM' : item.severity.toUpperCase(), message: item.action, riskScore: item.severity === 'High' ? 78 : item.severity === 'Moderate' ? 55 : 31, status: item.status === 'Open' ? 'NEW' : 'ACKNOWLEDGED', createdAt: new Date(Date.now() - Number.parseInt(item.timestamp) * 3600000) })),
  trend,
  database: 'in-memory demo fallback',
}
