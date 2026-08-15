import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../utils/formatters';

const COLORS = ['#7c3aed', '#10b981', '#f59e0b', '#3b82f6', '#f43f5e', '#8b5cf6'];
const TOOLTIP_STYLE = { backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fff' };

export const DailySpendingChart = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id="colorDaily" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3}/><stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/></linearGradient>
      </defs>
      <Tooltip contentStyle={TOOLTIP_STYLE} itemStyle={{ color: '#fff' }} formatter={(val) => [formatCurrency(val), 'Spent']} />
      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
      <XAxis dataKey="date" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
      <Area type="monotone" dataKey="amount" stroke="#7c3aed" strokeWidth={3} fillOpacity={1} fill="url(#colorDaily)" />
    </AreaChart>
  </ResponsiveContainer>
);

export const WeeklySpendingChart = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
      <Tooltip contentStyle={TOOLTIP_STYLE} itemStyle={{ color: '#fff' }} cursor={{ fill: '#27272a', opacity: 0.4 }} formatter={(val) => [formatCurrency(val), 'Amount']} />
      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
      <XAxis dataKey="week" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
      <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
);

export const CategoryDonutChart = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="amount" nameKey="category" stroke="none">
        {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
      </Pie>
      <Tooltip contentStyle={TOOLTIP_STYLE} itemStyle={{ color: '#fff' }} formatter={(val) => [formatCurrency(val), 'Amount']} />
    </PieChart>
  </ResponsiveContainer>
);

export const IncomeVsExpenseChart = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
      <Tooltip contentStyle={TOOLTIP_STYLE} itemStyle={{ color: '#fff' }} cursor={{ fill: '#27272a', opacity: 0.4 }} formatter={(val) => [formatCurrency(val)]} />
      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
      <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
      <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} />
      <Bar dataKey="expense" name="Expense" fill="#f43f5e" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
);

export const SavingsTrendChart = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
      <Tooltip contentStyle={TOOLTIP_STYLE} itemStyle={{ color: '#fff' }} formatter={(val) => [formatCurrency(val), 'Savings']} />
      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
      <XAxis dataKey="date" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
      <Line type="monotone" dataKey="amount" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, fill: '#f59e0b', strokeWidth: 0 }} activeDot={{ r: 6 }} />
    </LineChart>
  </ResponsiveContainer>
);
