import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
      <div
        className={`px-4 py-3 rounded-2xl shadow-2xl border flex items-center gap-3 backdrop-blur-md max-w-md ${
          toast.type === 'success'
            ? 'bg-slate-900/95 text-white border-blue-500/30'
            : toast.type === 'error'
            ? 'bg-rose-950/95 text-white border-rose-500/30'
            : 'bg-slate-900/95 text-white border-white/20'
        }`}
      >
        {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
        {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
        {toast.type === 'info' && <Info className="w-5 h-5 text-sky-400 shrink-0" />}
        <p className="text-xs font-semibold leading-tight">{toast.message}</p>
      </div>
    </div>
  );
};
