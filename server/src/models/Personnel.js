import mongoose from 'mongoose'
const schema = new mongoose.Schema({ personnelId: { type: String, required: true, unique: true }, name: String, unit: String, role: String, serviceYears: Number, workloadScore: Number, fatigueScore: Number, stressScore: Number, welfareScore: Number, riskScore: Number, riskLevel: { type: String, enum: ['LOW', 'MODERATE', 'HIGH'] }, lastCheckin: Date }, { timestamps: true })
export default mongoose.models.Personnel || mongoose.model('Personnel', schema)
