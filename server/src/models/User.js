import mongoose from 'mongoose'
const schema = new mongoose.Schema({ name: { type: String, required: true }, email: { type: String, required: true, unique: true }, passwordHash: { type: String, required: true, select: false }, role: { type: String, enum: ['ADMIN', 'WELFARE_OFFICER', 'UNIT_OFFICER', 'PERSONNEL'], required: true } }, { timestamps: true })
export default mongoose.models.User || mongoose.model('User', schema)
