import { User, Bell, Shield, Moon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Settings() {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Settings</h1>
        <p className="text-zinc-400 text-sm">Manage your account preferences and profile.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-2">
           <button className="w-full text-left px-4 py-3 rounded-lg bg-card border border-border text-white font-medium">Profile</button>
           <button className="w-full text-left px-4 py-3 rounded-lg text-zinc-400 hover:bg-zinc-800/50 hover:text-white transition-colors">Preferences</button>
           <button className="w-full text-left px-4 py-3 rounded-lg text-zinc-400 hover:bg-zinc-800/50 hover:text-white transition-colors">Security</button>
        </div>

        <div className="md:col-span-2 space-y-6">
           <div className="card-panel">
             <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2"><User size={18} className="text-primary"/> Public Profile</h3>
             <div className="flex items-center gap-6 mb-8">
               <div className="w-20 h-20 rounded-full bg-zinc-800 border border-border overflow-hidden shrink-0">
                  <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=18181b&color=fafafa`} alt="Profile" className="w-full h-full object-cover" />
               </div>
               <div>
                 <button className="btn-secondary py-2 px-4 text-sm mb-2">Change Avatar</button>
                 <p className="text-xs text-zinc-500">JPG, GIF or PNG. 1MB max.</p>
               </div>
             </div>
             
             <div className="space-y-4">
               <div>
                 <label className="block text-xs font-medium text-zinc-400 mb-2 uppercase">Display Name</label>
                 <input type="text" value={user?.name || ''} readOnly className="input-field bg-zinc-900/50" />
               </div>
               <div>
                 <label className="block text-xs font-medium text-zinc-400 mb-2 uppercase">Email Address</label>
                 <input type="email" value={user?.email || 'user@example.com'} readOnly className="input-field bg-zinc-900/50" />
                 <p className="text-xs text-zinc-500 mt-2">Email address cannot be changed directly. Contact support.</p>
               </div>
             </div>
           </div>

           <div className="card-panel">
             <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2"><Shield size={18} className="text-rose-500"/> Security</h3>
             <div className="flex items-center justify-between py-4 border-b border-border/50">
               <div>
                 <h4 className="text-white font-medium">Password</h4>
                 <p className="text-sm text-zinc-400">Manage your password</p>
               </div>
               <button className="btn-secondary w-auto py-2 px-4 text-sm">Change</button>
             </div>
             <div className="flex items-center justify-between py-4">
               <div>
                 <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                 <p className="text-sm text-zinc-400">Add an extra layer of security</p>
               </div>
               <button className="btn-primary w-auto py-2 px-4 text-sm">Enable</button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
