import Modal from './Modal';
import { Loader2, AlertTriangle } from 'lucide-react';

export default function DeleteConfirmation({ isOpen, onClose, onConfirm, title, isDeleting }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Deletion">
      <div className="flex flex-col items-center text-center pb-2">
        <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mb-4"><AlertTriangle size={24} /></div>
        <h3 className="text-lg font-bold text-white mb-2">Delete {title}?</h3>
        <p className="text-sm text-zinc-400 mb-6">Are you sure you want to delete this item? This action cannot be undone and will permanently remove the record from our servers.</p>
        <div className="w-full flex gap-3">
          <button onClick={onClose} disabled={isDeleting} className="btn-secondary flex-1">Cancel</button>
          <button onClick={onConfirm} disabled={isDeleting} className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-lg px-4 py-2.5 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background">
            {isDeleting ? <Loader2 size={16} className="animate-spin" /> : 'Yes, Delete'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
