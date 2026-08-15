# Finora - Premium Expense Tracker (Frontend)

## Project Overview
Finora is a premium, dark-themed personal finance and expense tracking application. It provides users with a comprehensive dashboard to monitor their income, expenses, recurring subscriptions, custom budgets, and split bills with friends.

## Features
- **Dashboard & Advanced Analytics:** Visual insights using Recharts for daily/weekly spending, category breakdowns, and savings trends.
- **Expense & Income Management:** Full CRUD operations with detailed categorization and date tracking.
- **Accounts/Wallets:** Manage multiple bank accounts, cash, and credit cards.
- **Recurring Bills:** Track subscriptions and calculate upcoming due amounts dynamically.
- **Split Expenses:** Track shared expenses, "owed to you", and "you owe" balances effortlessly.
- **Dynamic Budgeting:** Set a monthly budget with interactive visual warnings for exceeded limits.
- **Fully Responsive:** Optimized mobile-first navigation and adaptive grids.

## Tech Stack
- **Framework:** React 18 (Vite)
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **Animations:** GSAP
- **Icons:** Lucide React
- **Charts:** Recharts
- **HTTP Client:** Axios (Configured for HTTP-only cookies)

## Installation
1. Extract the project source code.
2. Open a terminal and navigate to the project directory.
3. Install dependencies:
   ```bash
   npm install
   ```

## Environment Variables
Create a `.env` file in the root directory (refer to `.env.example`).
```env
VITE_API_URL=http://localhost:3000/api
```

## Development Command
To start the local development server:
```bash
npm run dev
```

## Production Build Command
To build the application for production:
```bash
npm run build
```

## Backend API Requirement
The frontend strictly relies on a compatible backend REST API running concurrently (defaults to `http://localhost:3000/api`). Authentication utilizes secure HTTP-only cookies; JSON Web Tokens (JWT) are intentionally not stored in JavaScript memory (`localStorage` / `sessionStorage`) to mitigate XSS vulnerabilities.

## Project Structure
- `/src/components` - Reusable UI widgets, cards, charts, and form layouts.
- `/src/context` - Global state for Authentication and Toast notifications.
- `/src/layouts` - Global layout wrappers (Auth layout vs. Main authenticated layout).
- `/src/pages` - Feature-specific route views (Dashboard, Analytics, Expenses, Splits, Settings, etc.).
- `/src/services` - Modular Axios API endpoints mapping.
- `/src/utils` - Reusable formatting functions (Currency, Dates).
