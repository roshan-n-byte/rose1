import jwt from 'jsonwebtoken'

const secret = () => process.env.JWT_SECRET || 'prototype-only-secret'
export function signUser(user) { return jwt.sign({ id: user.id, role: user.role, name: user.name }, secret(), { expiresIn: '8h' }) }
export function requireAuth(req, res, next) {
  const token = req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.slice(7) : null
  if (!token) return res.status(401).json({ success: false, message: 'Authentication required' })
  try { req.user = jwt.verify(token, secret()); next() } catch { res.status(401).json({ success: false, message: 'Invalid or expired token' }) }
}
export function allowRoles(...roles) { return (req, res, next) => roles.includes(req.user?.role) ? next() : res.status(403).json({ success: false, message: 'Insufficient role permissions' }) }
