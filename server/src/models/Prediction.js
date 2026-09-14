import mongoose from 'mongoose'
const schema = new mongoose.Schema({ personnelId: { type: String, required: true }, model: String, riskScore: Number, riskLevel: String, stressRisk: Number, fatigueRisk: Number, workloadRisk: Number, welfareRisk: Number, factors: [String], recommendations: [String], disclaimer: String }, { timestamps: true })
export default mongoose.models.Prediction || mongoose.model('Prediction', schema)
