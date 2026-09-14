import 'dotenv/config'
import { app } from './app.js'
import { connectDatabase } from './config/db.js'
import { ensureDemoUsers } from './controllers/authController.js'

const port = process.env.PORT || 5000
const database = await connectDatabase()
ensureDemoUsers()
app.listen(port, () => console.log(`AI Welfare Monitoring API listening on http://localhost:${port} (${database.reason})`))
