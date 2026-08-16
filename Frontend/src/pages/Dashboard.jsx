import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Plus,
  Users,
  ShoppingBag,
  Car,
  Zap,
  Film,
  Package,
  Briefcase,
} from "lucide-react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useAuth } from "../context/AuthContext";
import { getAccountsApi } from "../api/accounts";
import { getIncomeApi } from "../api/income";
import { getExpensesApi } from "../api/expenses";
import { getAnalyticsApi } from "../api/analytics";
import { getRecurringApi } from "../api/recurring";
import StatCard from "../components/StatCard";
import AddExpenseModal from "../components/AddExpenseModal";
import AddIncomeModal from "../components/AddIncomeModal";
import { Loader, EmptyState } from "../components/Feedback";
import {
  formatCurrency,
  formatShortDate,
  isSameMonth,
  relativeDueLabel,
} from "../utils/format";

const catIcon = {
  Food: ShoppingBag,
  Travel: Car,
  Shopping: ShoppingBag,
  Bills: Zap,
  Entertainment: Film,
  Other: Package,
};

export default function Dashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [recurring, setRecurring] = useState([]);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showAddIncome, setShowAddIncome] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [accRes, incRes, expRes, anaRes, recRes] = await Promise.all([
        getAccountsApi().catch(() => ({ accounts: [] })),
        getIncomeApi().catch(() => ({ income: [] })),
        getExpensesApi({ limit: 6 }).catch(() => ({ expenses: [] })),
        getAnalyticsApi().catch(() => ({ analytics: null })),
        getRecurringApi().catch(() => ({ recurringExpenses: [] })),
      ]);
      setAccounts(accRes.accounts || []);
      setIncome(incRes.income || []);
      setExpenses(expRes.expenses || []);
      setAnalytics(anaRes.analytics || null);
      setRecurring(recRes.recurringExpenses || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <Loader label="Loading your dashboard..." />;

  const totalBalance = accounts.reduce((s, a) => s + (a.balance || 0), 0);
  const monthlyIncome = income
    .filter((i) => isSameMonth(i.date))
    .reduce((s, i) => s + i.amount, 0);
  const monthlyExpenses = analytics?.monthlyTotal || 0;
  const savings = monthlyIncome - monthlyExpenses;

  const chartData = (analytics?.dailySpending || []).map((d) => ({
    date: d._id?.slice(5),
    amount: d.total,
  }));

  const recentTransactions = [
    ...expenses.map((e) => ({
      id: e._id,
      title: e.title,
      category: e.category,
      date: e.date,
      amount: -e.amount,
      type: "expense",
    })),
    ...income.slice(0, 3).map((i) => ({
      id: i._id,
      title: i.title,
      category: i.source,
      date: i.date,
      amount: i.amount,
      type: "income",
    })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const upcoming = [...recurring]
    .filter((r) => r.isActive !== false)
    .sort((a, b) => new Date(a.nextDueDate) - new Date(b.nextDueDate))
    .slice(0, 3);

  const budgetSpent = monthlyExpenses;
  const budgetTotal = analytics?.monthlyBudget || 0;
  const budgetPct = budgetTotal
    ? Math.min(100, Math.round((budgetSpent / budgetTotal) * 100))
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Good {greeting()}, {user?.username}.
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            Here's your financial overview.
          </p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Balance"
          value={formatCurrency(totalBalance)}
          sub="Across all accounts"
          icon={Wallet}
          iconTone="brand"
        />
        <StatCard
          label="Income (this month)"
          value={formatCurrency(monthlyIncome)}
          sub="Recorded this month"
          subTone="up"
          icon={TrendingUp}
          iconTone="emerald"
        />
        <StatCard
          label="Expenses (this month)"
          value={formatCurrency(monthlyExpenses)}
          sub={
            analytics?.budgetExceeded
              ? `Over budget by ${formatCurrency(
                  analytics.budgetExceededAmount
                )}`
              : "Within budget"
          }
          subTone={analytics?.budgetExceeded ? "down" : "neutral"}
          icon={TrendingDown}
          iconTone="red"
        />
        <StatCard
          label="Savings (this month)"
          value={formatCurrency(savings)}
          sub={savings >= 0 ? "Positive cash flow" : "Spending more than earning"}
          subTone={savings >= 0 ? "up" : "down"}
          icon={PiggyBank}
          iconTone="amber"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Spending overview */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Spending Overview</h3>
            <span className="badge">This month</span>
          </div>
          {chartData.length === 0 ? (
            <EmptyState
              title="No spending data yet"
              sub="Add an expense to see your trend line here."
            />
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="fillAmt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#232329"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    stroke="#52525b"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#52525b"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    width={40}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#141419",
                      border: "1px solid #232329",
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                    formatter={(v) => formatCurrency(v)}
                  />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#7c3aed"
                    strokeWidth={2.5}
                    fill="url(#fillAmt)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Monthly budget + quick actions */}
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="font-semibold text-white mb-4">Monthly Budget</h3>
            {budgetTotal ? (
              <>
                <div className="flex justify-between text-sm mb-2">
                  <div>
                    <p className="text-zinc-500 text-xs">Spent</p>
                    <p className="font-semibold text-white">
                      {formatCurrency(budgetSpent)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-zinc-500 text-xs">Remaining</p>
                    <p
                      className={`font-semibold ${
                        analytics?.budgetRemaining < 0
                          ? "text-red-400"
                          : "text-brand-light"
                      }`}
                    >
                      {formatCurrency(analytics?.budgetRemaining)}
                    </p>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-base-panel overflow-hidden mb-1.5">
                  <div
                    className={`h-full rounded-full ${
                      analytics?.budgetExceeded ? "bg-red-500" : "bg-brand"
                    }`}
                    style={{ width: `${budgetPct}%` }}
                  />
                </div>
                <p className="text-xs text-zinc-500">
                  of {formatCurrency(budgetTotal)}
                </p>
              </>
            ) : (
              <EmptyState
                title="No budget set"
                sub="Set a monthly budget to track your spending limit."
                action={
                  <Link to="/budget" className="btn-secondary text-xs">
                    Set Budget
                  </Link>
                }
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setShowAddExpense(true)}
              className="btn-primary py-3"
            >
              <Plus size={16} /> Expense
            </button>
            <button
              onClick={() => setShowAddIncome(true)}
              className="btn-secondary py-3"
            >
              <Plus size={16} /> Income
            </button>
            <Link
              to="/recurring"
              className="btn-secondary py-3 col-span-1"
            >
              <PiggyBank size={16} /> Recurring
            </Link>
            <Link to="/split-expenses" className="btn-secondary py-3">
              <Users size={16} /> Split
            </Link>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent transactions */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Recent Transactions</h3>
            <Link
              to="/expenses"
              className="text-brand-light text-sm hover:underline"
            >
              View All
            </Link>
          </div>

          {recentTransactions.length === 0 ? (
            <EmptyState
              title="No transactions yet"
              sub="Add your first expense or income to get started."
            />
          ) : (
            <div className="divide-y divide-base-border">
              {recentTransactions.map((t) => {
                const Icon =
                  t.type === "income"
                    ? Briefcase
                    : catIcon[t.category] || Package;
                return (
                  <div
                    key={t.id}
                    className="flex items-center justify-between py-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-base-panel border border-base-border flex items-center justify-center shrink-0">
                        <Icon size={15} className="text-zinc-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {t.title}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {t.category} · {formatShortDate(t.date)}
                        </p>
                      </div>
                    </div>
                    <p
                      className={`text-sm font-semibold shrink-0 ${
                        t.amount < 0 ? "text-zinc-300" : "text-emerald-400"
                      }`}
                    >
                      {t.amount < 0 ? "-" : "+"}
                      {formatCurrency(Math.abs(t.amount))}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Upcoming */}
        <div className="card p-6">
          <h3 className="font-semibold text-white mb-4">Upcoming</h3>
          {upcoming.length === 0 ? (
            <EmptyState
              title="Nothing due soon"
              sub="Recurring expenses will show up here."
            />
          ) : (
            <div className="space-y-3">
              {upcoming.map((r) => (
                <div
                  key={r._id}
                  className="flex items-center justify-between p-3 rounded-xl bg-base-panel border border-base-border"
                >
                  <div>
                    <p className="text-sm font-medium text-white">
                      {r.title}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {relativeDueLabel(r.nextDueDate)}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-white">
                    {formatCurrency(r.amount)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <AddExpenseModal
        open={showAddExpense}
        onClose={() => setShowAddExpense(false)}
        onSaved={load}
      />
      <AddIncomeModal
        open={showAddIncome}
        onClose={() => setShowAddIncome(false)}
        onSaved={load}
      />
    </div>
  );
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "morning";
  if (h < 18) return "afternoon";
  return "evening";
}
