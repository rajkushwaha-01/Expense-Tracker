import { Search, Bell, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Topbar({ setMobileMenuOpen }) {
  const { user } = useAuth();
  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1">
        <button className="lg:hidden text-textMuted hover:text-textMain focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded p-1" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
          <Menu size={24} />
        </button>
        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
          <input type="text" placeholder="Search transactions..." aria-label="Search" className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-2 text-sm text-textMain placeholder:text-zinc-600 focus:outline-none focus:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/50 transition-colors" />
        </div>
      </div>
      <div className="flex items-center gap-3 sm:gap-4">
        <button className="text-zinc-400 hover:text-white relative p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="Notifications">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border border-background"></span>
        </button>
        <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden border border-border">
           <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=18181b&color=fafafa`} alt="Profile" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
}
