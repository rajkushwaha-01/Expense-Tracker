import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import gsap from 'gsap';

export default function Modal({ isOpen, onClose, title, children }) {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 });
      gsap.fromTo(modalRef.current, { opacity: 0, scale: 0.95, y: 10 }, { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'power2.out' });
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div ref={backdropRef} className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} aria-hidden="true"></div>
      <div ref={modalRef} className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-border">
          <h2 id="modal-title" className="text-lg font-bold text-white">{title}</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="Close modal"><X size={20} /></button>
        </div>
        <div className="p-5 sm:p-6 overflow-y-auto custom-scrollbar">{children}</div>
      </div>
    </div>
  );
}
