import { processCommand } from '../services/assistantService.js'
export function queryAssistant(req, res) { res.json(processCommand(req.body.command)) }
