import { dashboard, series } from './analyticsService.js'
import { store } from '../config/store.js'

export function processCommand(command = '') { const text = command.toLowerCase(); const stats = dashboard(); let intent = 'HELP'; let message = 'I can show the dashboard, risk groups, alerts, stress trends, fatigue trends, workload, welfare check-in, or a summary.'; let data = []
  if (text.includes('high risk') || text.includes('high-risk')) { intent = 'HIGH_RISK_PERSONNEL'; data = store.personnel.filter((item) => item.riskLevel === 'HIGH'); message = `There are ${data.length} high-risk personnel in the simulated monitoring data.` }
  else if (text.includes('moderate risk')) { intent = 'MODERATE_RISK_PERSONNEL'; data = store.personnel.filter((item) => item.riskLevel === 'MODERATE'); message = `There are ${data.length} moderate-risk personnel in the simulated monitoring data.` }
  else if (text.includes('low risk')) { intent = 'LOW_RISK_PERSONNEL'; data = store.personnel.filter((item) => item.riskLevel === 'LOW'); message = `There are ${data.length} low-risk personnel in the simulated monitoring data.` }
  else if (text.includes('alert')) { intent = 'ALERTS'; data = store.alerts; message = `There are ${stats.activeAlerts} active alerts today. Review workload, fatigue, stress, and welfare follow-up signals.` }
  else if (text.includes('stress')) { intent = 'STRESS_ANALYTICS'; data = series('stress'); message = 'Opening the weekly stress trend for analysis.' }
  else if (text.includes('fatigue')) { intent = 'FATIGUE_ANALYTICS'; data = series('fatigue'); message = 'Opening the weekly fatigue trend for analysis.' }
  else if (text.includes('workload')) { intent = 'WORKLOAD_ANALYTICS'; data = series('workload'); message = 'Opening workload indicators for analysis.' }
  else if (text.includes('check-in') || text.includes('check in') || text.includes('welfare')) { intent = 'WELFARE_CHECKIN'; message = 'Opening the welfare check-in.' }
  else if (text.includes('summary') || text.includes('dashboard') || text.includes('how many')) { intent = 'DAILY_SUMMARY'; message = `Today, ${stats.checkinsToday} personnel completed welfare check-ins. ${stats.highRisk} personnel are currently high risk and ${stats.activeAlerts} active alerts require attention.` }
  return { success: true, intent, message, data, navigation: intent.includes('PERSONNEL') ? 'personnel' : intent === 'ALERTS' ? 'alerts' : intent.includes('ANALYTICS') ? 'analytics' : intent === 'WELFARE_CHECKIN' ? 'checkin' : 'dashboard', disclaimer: 'AI-generated indicators are decision-support signals and are not medical diagnoses.' }
}
