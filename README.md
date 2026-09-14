# AI Welfare Monitor

Smart India Hackathon 2026 full-stack prototype for non-medical, human-led stress and welfare monitoring across uniformed forces, CAPF, and state police units.

## Technologies

- React + Vite frontend
- Node.js + Express backend
- MongoDB + Mongoose-ready configuration
- JWT authentication and bcryptjs password hashing
- Helmet, CORS, rate limiting, Morgan, Joi validation
- Recharts and Lucide React

## Run locally

```bash
npm install
npm run seed
npm run dev
```
Open `http://localhost:5173`. Vite proxies `/api` requests to the backend at `http://localhost:5000`.

For a single-host deployment, the Express server serves the built Vite frontend and the API from the same origin. Set the service start command to `npm start`, the build command to `npm install && npm run build`, and the health check to `/api/health`. A ready-to-use `render.yaml` is included for Render.

For GitHub Pages, add a repository Actions secret named `VITE_API_URL` containing the deployed Express backend URL. Pages cannot run the backend itself, so this secret is required for sign-in, predictions, alerts, and analytics to work online.

The backend starts without MongoDB by using an in-memory fictional demo fallback. To use MongoDB, copy `server/.env.example` to `server/.env` or configure the root environment with `MONGODB_URI`.

## Demo credentials

- Welfare officer: `welfare@example.com` / `Demo@123`
- Administrator: `admin@example.com` / `Demo@123`
- Unit officer: `unit@example.com` / `Demo@123`

## Backend structure

The modular backend lives under `server/src`:

```text
config       database connection and demo store
controllers  auth, personnel, check-in, prediction, alert, analytics, assistant
middleware   JWT roles, validation, centralized errors
models       MongoDB model boundary reserved for persistence adapters
routes       REST API route modules
services     risk engine, analytics, assistant command processing
utils        demo data seed command
```

## API

Health: `GET /api/health`

Auth: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`

Personnel: `GET|POST /api/personnel`, `GET|PUT|DELETE /api/personnel/:id` with search, pagination, risk and unit filters.

Welfare: `POST /api/checkins`, `GET /api/checkins/:personnelId`, `GET /api/checkins/recent`

Predictions: `POST /api/predictions`, `GET /api/predictions/:personnelId`

Alerts: `GET /api/alerts`, `GET /api/alerts/:id`, and acknowledge, follow-up, and resolve PATCH actions.

Analytics: `/api/analytics/dashboard`, `/stress`, `/fatigue`, `/workload`, `/welfare`, `/units`, `/weekly`

Assistant: `POST /api/assistant/query` with `{ "command": "Show high risk personnel" }`.

Sensitive endpoints require `Authorization: Bearer <token>`.

## Risk engine

The `Prototype AI Risk Simulation` uses transparent weighted indicators: workload 20%, stress 25%, fatigue/rest 20%, wellbeing 20%, duty pattern 10%, and recent trend 5%. Scores map to LOW (0-39), MODERATE (40-69), and HIGH (70-100). A high score can generate a follow-up alert.

All generated records are fictional. AI-generated indicators are decision-support signals and are not medical diagnoses. The system must not be used for automated disciplinary decisions or as a replacement for qualified professional assessment.
# AI Welfare Monitor

A Smart India Hackathon 2026 software prototype for non-medical, human-led stress and welfare monitoring across uniformed forces, CAPF, and state police units.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. The Vite frontend and Express API run together. No MongoDB connection is required: the API uses fictional in-memory demo data automatically.

## Included prototype flows

- Command-center dashboard with stress, fatigue, welfare, and risk distribution charts
- 25 fictional personnel across five units with search and status indicators
- Transparent rule-based Prototype AI Risk Simulation
- Daily welfare check-in with informational score output
- Analytics, alert management, governance, privacy, and settings views
- Welfare AI Assistant with text commands, browser SpeechRecognition where supported, and SpeechSynthesis responses
- Responsive mobile sidebar, theme toggle, notification indicator, demo mode, and export affordance

## API

`GET /api/dashboard`, `GET /api/personnel`, `GET /api/personnel/:id`, `GET /api/alerts`, `GET /api/analytics`, `POST /api/checkin`, `POST /api/predict`, and `POST /api/alerts/:id/acknowledge`.

All records are fictional. AI-generated indicators are intended only to support authorized welfare and administrative decision-making. They are not medical diagnoses and should not replace qualified professional assessment. This prototype does not make automated disciplinary decisions.
