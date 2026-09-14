const clamp = (value) => Math.max(0, Math.min(100, Math.round(value)))

export function calculateRisk(input = {}) {
  const workload = Number(input.workload ?? input.workloadScore ?? 5)
  const restLevel = Number(input.restLevel ?? input.rest ?? 5)
  const stressLevel = Number(input.stressLevel ?? input.stress ?? 5)
  const wellbeing = Number(input.wellbeing ?? 5)
  const dutyHours = Number(input.dutyHours ?? 8)
  const restDays = Number(input.restDays ?? 2)
  const recentTrend = Number(input.recentTrend ?? 50)
  const workloadRisk = clamp(workload * 10)
  const stressRisk = clamp(stressLevel * 10)
  const fatigueRisk = clamp((10 - restLevel) * 8 + Math.max(0, dutyHours - 8) * 4 + Math.max(0, 2 - restDays) * 6)
  const welfareRisk = clamp((10 - wellbeing) * 10)
  const dutyRisk = clamp(Math.max(0, dutyHours - 8) * 10 + Math.max(0, 2 - restDays) * 10)
  const riskScore = clamp(workloadRisk * .2 + stressRisk * .25 + fatigueRisk * .2 + welfareRisk * .2 + dutyRisk * .1 + recentTrend * .05)
  const riskLevel = riskScore >= 70 ? 'HIGH' : riskScore >= 40 ? 'MODERATE' : 'LOW'
  const factors = []
  if (workloadRisk >= 60) factors.push('Elevated workload')
  if (fatigueRisk >= 55) factors.push('Reduced rest indicator')
  if (stressRisk >= 60) factors.push('Elevated stress self-rating')
  if (recentTrend >= 60) factors.push('Recent stress trend increased')
  const recommendations = riskLevel === 'HIGH' ? ['Consider workload review', 'Consider welfare follow-up', 'Review recent duty and recovery patterns'] : riskLevel === 'MODERATE' ? ['Encourage appropriate rest and recovery', 'Review recent duty patterns'] : ['Continue routine welfare check-ins']
  return { model: 'Prototype AI Risk Simulation', riskScore, riskLevel, stressRisk, fatigueRisk, workloadRisk, welfareRisk: clamp(100 - welfareRisk), factors, recommendations, disclaimer: 'AI-generated indicators are decision-support signals and are not medical diagnoses.' }
}
