import { ChevronLeft, ChevronRight } from 'lucide-react';
export default function Pagination({ currentPage, totalPages, totalItems, limit, onPageChange }) {
  if (totalPages <= 1) return null;
  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalItems);

  return (
    <div className="p-4 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-zinc-400">
      <div>Showing <span className="font-medium text-white">{startItem}</span> to <span className="font-medium text-white">{endItem}</span> of <span className="font-medium text-white">{totalItems}</span> results</div>
      <div className="flex items-center gap-1 sm:gap-2">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2 rounded-lg border border-border bg-background hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="Previous page"><ChevronLeft size={16} /></button>
        <div className="flex gap-1 hidden sm:flex">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
            if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
              return <button key={page} onClick={() => onPageChange(page)} className={`w-8 h-8 rounded-lg flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${currentPage === page ? 'bg-primary text-white' : 'hover:bg-zinc-800 text-zinc-400 hover:text-white'}`}>{page}</button>;
            } else if (page === currentPage - 2 || page === currentPage + 2) {
              return <span key={page} className="px-1 text-zinc-600 flex items-center">...</span>;
            }
            return null;
          })}
        </div>
        <div className="sm:hidden px-3 font-medium text-white">Page {currentPage} of {totalPages}</div>
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 rounded-lg border border-border bg-background hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="Next page"><ChevronRight size={16} /></button>
      </div>
    </div>
  );
}
