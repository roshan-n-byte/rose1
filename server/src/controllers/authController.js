import bcrypt from 'bcryptjs'
import { randomUUID } from 'node:crypto'
import { store } from '../config/store.js'
import { signUser } from '../middleware/authMiddleware.js'

const publicUser = (user) => ({ id: user.id, name: user.name, role: user.role, email: user.email })
export async function register(req, res) { const { name, email, password, role } = req.body; if (store.users.some((user) => user.email === email)) return res.status(409).json({ success: false, message: 'Email already registered' }); const user = { id: randomUUID(), name, email, role, passwordHash: await bcrypt.hash(password, 10) }; store.users.push(user); res.status(201).json({ success: true, token: signUser(user), user: publicUser(user) }) }
export async function login(req, res) { const { email, password } = req.body; const user = store.users.find((item) => item.email === email); if (!user || !(await bcrypt.compare(password, user.passwordHash))) return res.status(401).json({ success: false, message: 'Invalid credentials' }); res.json({ success: true, token: signUser(user), user: publicUser(user) }) }
export function me(req, res) { const user = store.users.find((item) => item.id === req.user.id); res.json({ success: true, data: user ? publicUser(user) : req.user }) }
export function ensureDemoUsers() { if (store.users.length) return; const passwordHash = bcrypt.hashSync('Demo@123', 10); store.users.push({ id: 'demo-welfare-officer', name: 'Arjun Verma', email: 'welfare@example.com', role: 'WELFARE_OFFICER', passwordHash }, { id: 'demo-admin', name: 'Demo Administrator', email: 'admin@example.com', role: 'ADMIN', passwordHash }, { id: 'demo-unit-officer', name: 'Unit Officer', email: 'unit@example.com', role: 'UNIT_OFFICER', passwordHash }, { id: 'demo-personnel', name: 'Demo Personnel', email: 'personnel@example.com', role: 'PERSONNEL', passwordHash }) }
