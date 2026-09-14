import 'dotenv/config'
import { connectDatabase } from '../config/db.js'
import { ensureDemoUsers } from '../controllers/authController.js'
import { store } from '../config/store.js'

await connectDatabase()
ensureDemoUsers()
console.log(`Demo data ready: ${store.personnel.length} personnel, ${store.alerts.length} alerts, ${store.users.length} demo users.`)
console.log('Demo officer login: welfare@example.com / Demo@123')
console.log('Demo personnel login: personnel@example.com / Demo@123')
process.exit(0)
