import mongoose from 'mongoose'
const schema = new mongoose.Schema({ alertId: { type: String, required: true, unique: true }, personnelId: String, type: { type: String, enum: ['STRESS', 'FATIGUE', 'WORKLOAD', 'WELFARE', 'FOLLOW_UP'] }, severity: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH'] }, message: String, riskScore: Number, status: { type: String, enum: ['NEW', 'ACKNOWLEDGED', 'FOLLOW_UP', 'RESOLVED'] }, acknowledgedAt: Date }, { timestamps: true })
export default mongoose.models.Alert || mongoose.model('Alert', schema)
