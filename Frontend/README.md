# Finora — Frontend

A complete React + Vite + Tailwind frontend for the Finora Express/MongoDB
backend, styled to match the dark, violet "premium finance" design provided.

## What's covered

Every route the backend exposes has a matching screen:

| Backend route | Frontend |
|---|---|
| `POST /api/auth/register`, `/login`, `GET /me` | Login & Register pages, session persisted via cookie |
| `GET/POST/PUT/DELETE /api/expenses` | Expenses page — filters (category, payment method, date range), search, pagination, add/edit/delete |
| `GET/POST /api/income` | Income page — stats + recent income table |
| `GET/POST/DELETE /api/recurring` | Recurring Expenses page — cards, upcoming-7-days rail, category summary |
| `GET/POST /api/accounts` | Accounts page — balances per account, net balance |
| `GET/POST /api/splits` | Split Expenses page — participants, "split evenly" helper, owed/paid status |
| `PUT /api/budget` | Budget page — set monthly budget, live progress |
| `GET /api/analytics` | Analytics page — category pie chart, daily bar chart, highest/average expense |
| `GET /api/ai/spending-analysis`, `POST /api/ai/ask` | **Ask AI** page — one-click AI spending analysis + a chat interface for financial questions |

The Dashboard pulls together accounts, income, expenses, analytics and
recurring data into one overview (balance, income/expenses/savings this
month, spending trend, budget progress, recent transactions, upcoming bills).

Nothing is invented beyond what the backend actually supports — e.g. there's
no "transfer between accounts" button because no such endpoint exists, and
Settings notes that profile editing isn't available since there's no
update-profile route.

## Getting started

```bash
npm install
cp .env.example .env   # point VITE_API_URL at your backend if it's not on :3000
npm run dev
```

The app runs on `http://localhost:5173` by default — this **must** match your
backend's CORS config (`Backend/src/app.js` currently allows exactly this
origin).

Make sure your backend is running first (`npm run dev` inside `Backend/`,
with `MONGO_URI`, `JWT_SECRET`, and `GOOGLE_API_KEY` set in its `.env`) so the
frontend has something to talk to.

## Notes on auth

The backend signs a JWT and sets it via `res.cookie("token", token)` with no
`httpOnly` flag, so the cookie is readable/clearable from the browser. There's
no `/logout` route, so "Log out" simply clears that cookie client-side and
resets local state — same effect, no backend change needed.

## Stack

- React 18 + React Router 6
- Vite
- Tailwind CSS
- Axios (with `withCredentials: true` so the auth cookie is sent)
- Recharts (spending charts)
- lucide-react (icons)
