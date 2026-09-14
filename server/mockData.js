const names = ['Arjun Mehta', 'Nisha Rao', 'Kabir Singh', 'Meera Das', 'Rohan Iyer', 'Zoya Khan', 'Vikram Joshi', 'Aditi Menon', 'Dev Malhotra', 'Ishaan Bose', 'Tara Kapoor', 'Sameer Ali', 'Ananya Shah', 'Neel Verma', 'Pooja Nair', 'Karan Bedi', 'Ritu Sethi', 'Adil Hussain', 'Maya Pillai', 'Harsh Vardhan', 'Sana Qureshi', 'Aman Tiwari', 'Diya Roy', 'Naveen Reddy', 'Leena Thomas']
const units = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo']
const roles = ['Field Officer', 'Operations Lead', 'Communications', 'Logistics', 'Medical Liaison']
const levels = ['Low', 'Low', 'Low', 'Moderate', 'Moderate', 'High']
export const personnel = names.map((name, index) => {
  const risk = levels[index % levels.length]
  return { id: `PF-${String(2401 + index).padStart(4, '0')}`, name, unit: units[index % units.length], role: roles[index % roles.length], workload: 32 + ((index * 11) % 59), fatigue: 24 + ((index * 13) % 64), stress: risk === 'High' ? 76 : risk === 'Moderate' ? 54 : 28 + (index % 12), risk, welfare: risk === 'High' ? 'Follow-up' : risk === 'Moderate' ? 'Check-in due' : 'Stable', lastCheckin: `${(index % 7) + 1}h ago` }
})
export const trend = [
  { day: 'Mon', stress: 38, fatigue: 42, welfare: 78 }, { day: 'Tue', stress: 44, fatigue: 46, welfare: 74 },
  { day: 'Wed', stress: 41, fatigue: 43, welfare: 76 }, { day: 'Thu', stress: 52, fatigue: 55, welfare: 68 },
  { day: 'Fri', stress: 49, fatigue: 51, welfare: 71 }, { day: 'Sat', stress: 58, fatigue: 61, welfare: 63 },
  { day: 'Sun', stress: 55, fatigue: 57, welfare: 67 },
]
export const alerts = Array.from({ length: 18 }, (_, index) => ({ id: `ALT-${String(800 + index)}`, personnelId: personnel[index % personnel.length].id, type: ['Workload', 'Fatigue', 'Stress', 'Welfare'][index % 4], severity: index % 5 === 0 ? 'High' : index % 2 ? 'Moderate' : 'Low', timestamp: `${index + 1}h ago`, status: index % 3 === 0 ? 'Open' : 'Monitoring', action: ['Review duty pattern', 'Encourage recovery', 'Schedule welfare follow-up'][index % 3] }))
export function calculateRisk(input = {}) {
  const workload = Number(input.workload ?? 50), rest = Number(input.rest ?? 50), stress = Number(input.stress ?? 50), dutyHours = Number(input.dutyHours ?? 8)
  const score = Math.min(100, Math.round(workload * 0.3 + (100 - rest) * 0.2 + stress * 0.3 + Math.max(0, dutyHours - 8) * 5 + 10))
  return { score, category: score >= 70 ? 'High' : score >= 40 ? 'Moderate' : 'Low', stress: Math.min(100, Math.round(stress * 0.9 + 8)), fatigue: Math.min(100, Math.round((100 - rest) * 0.8 + dutyHours * 2)), workload: workload, welfare: Math.max(0, 100 - score) }
}
