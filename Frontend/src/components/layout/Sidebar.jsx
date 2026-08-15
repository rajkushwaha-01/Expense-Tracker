import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutGrid, Wallet, ArrowDownToLine, Repeat, Landmark, Users, PieChart, PiggyBank, Settings, LogOut, X } from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { path: '/expenses', label: 'Expenses', icon: Wallet },
  { path: '/income', label: 'Income', icon: ArrowDownToLine },
  { path: '/recurring', label: 'Recurring', icon: Repeat },
  { path: '/accounts', label: 'Accounts', icon: Landmark },
  { path: '/splits', label: 'Split Expenses', icon: Users },
  { path: '/analytics', label: 'Analytics', icon: PieChart },
  { path: '/budget', label: 'Budget', icon: PiggyBank },
  { path: '/settings', label: 'Settings', icon: Settings }
];

export default function Sidebar({ mobileMenuOpen, setMobileMenuOpen }) {
  const { logout, user } = useAuth();
  const name = user?.name || 'User';

  return (
    <>
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} aria-hidden="true" />
      )}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-border flex flex-col transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
              <Landmark size={20} />
            </div>
            <div>
              <h1 className="font-semibold text-lg text-textMain leading-tight">Finora</h1>
              <p className="text-xs text-textMuted uppercase tracking-wider">Premium Finance</p>
            </div>
          </div>
          <button className="lg:hidden text-zinc-400 hover:text-white" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path} 
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-zinc-400 hover:text-zinc-100 hover:bg-card'}`}
            >
              <item.icon size={18} />{item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 mt-auto border-t border-border">
          <button onClick={logout} className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-card transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs text-white uppercase">{name.charAt(0)}</div>
              <span className="truncate max-w-[100px]">{name}</span>
            </div>
            <LogOut size={16} />
          </button>
        </div>
      </aside>
    </>
  );
}
