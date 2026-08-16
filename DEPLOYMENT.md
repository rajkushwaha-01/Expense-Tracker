# Deploying Finora (Expense Tracker) — one Render service, one domain

Express serves the built React app directly, so frontend and backend live
on the same Render service and the same domain. No CORS, no cross-site
cookie issues, no second host to manage.

## How it works

- `Frontend/vite.config.js` builds straight into `Backend/public`
  (`outDir: "../Backend/public"`).
- `Backend/src/app.js` serves that folder as static files, and falls back
  to `index.html` for any non-`/api` GET request so React Router routes
  (e.g. `/expenses`) work on a hard refresh. Unmatched `/api/*` requests
  still get a proper JSON 404.
- The root `package.json` has the `build`/`start` scripts Render runs:
  `build` installs and builds the frontend into `Backend/public`, then
  installs backend deps; `start` runs the backend, which now serves both.
- The frontend's API client defaults to the relative path `/api` — same-origin
  in production, and proxied to the backend by Vite in local dev
  (`Frontend/vite.config.js` → `server.proxy`), so no `VITE_API_URL` is
  needed either way.
- The auth cookie is `httpOnly`, `sameSite: "lax"`, and `secure` only when
  `NODE_ENV=production` — same-origin means `SameSite=None` was never
  actually needed here.

## 1. Database — MongoDB Atlas

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Add a database user, and under Network Access allow `0.0.0.0/0` (Render's
   outbound IPs aren't static on the free tier).
3. Copy the connection string — this is your `MONGO_URI`.

## 2. Render — one Web Service

1. Push this repo to GitHub.
2. New → Web Service → connect the repo. **Root Directory: leave blank**
   (the repo root — that's where the orchestrating `package.json` lives).
3. Build Command: `npm run build`
4. Start Command: `npm start`
5. Environment variables:
   - `MONGO_URI` — from Atlas
   - `JWT_SECRET` — a long random string (`openssl rand -base64 48`)
   - `GOOGLE_API_KEY` — your Gemini key
   - `NODE_ENV` — `production`
   - `PORT` — Render sets this automatically, no need to add it
   - `FRONTEND_URL` — leave unset; it's only for hitting the API from a
     separate origin (see below), which doesn't apply to this setup
6. Deploy. Once it's up:
   - `https://your-app.onrender.com/health` → `{"success":true,...}`
   - `https://your-app.onrender.com/` → the app itself

## 3. Sanity check

- Register an account, refresh the page — should stay logged in.
- Hard-refresh a nested route like `/expenses` — should load, not 404.
- Log out — should actually clear the session.
- Hit a bogus API path like `/api/nope` — should return JSON `404`, not the
  app's `index.html`.

## Local development

Two options:

- **Two servers (hot reload on both)**: `npm run dev --prefix Backend` and
  `npm run dev --prefix Frontend` in separate terminals. The frontend runs on
  `:5173` and its dev server proxies `/api` calls to the backend on `:3000` —
  same relative-path setup as production, so nothing to configure.
- **Production-like, one server**: `npm run build` then `npm start` from the
  repo root — builds the frontend into `Backend/public` and serves everything
  from `:3000`.

`Backend/.env` is gitignored and not included in this package — copy
`Backend/.env.example` to `Backend/.env` and fill in real values for local
dev; set the real values in Render's dashboard for production.

## If you ever want to split frontend and backend onto separate hosts

This setup optimizes for one domain. If you later want the frontend on
Vercel/Netlify and the backend elsewhere, you'd need to: point
`Frontend/vite.config.js`'s `outDir` back to a local `dist/`, set
`VITE_API_URL` to the backend's full URL, set the backend's `FRONTEND_URL`
to the frontend's deployed URL (CORS is already wired for this — it only
activates when `FRONTEND_URL` is set), and change the cookie's `sameSite`
back to `"none"` in `Backend/src/controllers/auth.controller.js` since the
two origins would no longer be same-site. Ask if you want this wired up.

## Notes

- The recurring-expense cron job (`node-cron`) runs in-process, so it only
  fires while the service is awake. Render's free tier spins down on
  inactivity — fine for a demo, but for reliable recurring expenses you'd
  want an always-on plan or an external cron hitting an endpoint.
