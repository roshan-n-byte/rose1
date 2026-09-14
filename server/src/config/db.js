import mongoose from 'mongoose'

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI
  if (!uri) return { connected: false, reason: 'MONGODB_URI is not configured' }
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 2500 })
    return { connected: true, reason: 'MongoDB connected' }
  } catch (error) {
    console.warn(`MongoDB unavailable; using in-memory demo data. ${error.message}`)
    return { connected: false, reason: 'MongoDB unavailable; in-memory fallback active' }
  }
}
