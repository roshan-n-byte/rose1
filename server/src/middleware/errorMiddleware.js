export function notFound(req, res) { res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.path}` }) }
export function errorHandler(error, _req, res, _next) { console.error(error); res.status(error.status || 500).json({ success: false, message: error.status ? error.message : 'Internal server error' }) }
