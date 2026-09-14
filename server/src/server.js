import 'dotenv/config'
import { app } from './app.js'
import { connectDatabase } from './config/db.js'
import { ensureDemoUsers } from './controllers/authController.js'
import { store } from './config/store.js'

const port = process.env.PORT || 5000
const database = await connectDatabase()
store.database = database.connected ? 'connected' : 'in-memory demo fallback'
ensureDemoUsers()
app.listen(port, () => console.log(`AI Welfare Monitoring API listening on http://localhost:${port} (${database.reason})`))
