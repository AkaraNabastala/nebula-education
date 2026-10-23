import React, { useState, useEffect } from 'react';
import {
  X,
  QrCode,
  CreditCard,
  Building,
  CheckCircle2,
  Copy,
  Clock,
  ShieldAlert,
  Smartphone,
  Info,
  Server
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Invoice } from '../types';
import { formatCurrencyIDR } from '../utils/formatters';

interface MidtransModalProps {
  invoice: Invoice;
  onClose: () => void;
}

export const MidtransModal: React.FC<MidtransModalProps> = ({ invoice, onClose }) => {
  const { payInvoiceWithMidtrans, showToast, setActiveReceiptInvoice } = useApp();
  const [selectedMethod, setSelectedMethod] = useState<'qris' | 'bca_va' | 'gopay'>('qris');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Keyboard accessibility: Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const virtualAccountNumber = `8277 0065 ${invoice.student_nisn.slice(-4)}`;

  const handleSimulateSuccess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      let methodName = 'Midtrans QRIS (Simulasi)';
      if (selectedMethod === 'bca_va') methodName = 'Midtrans BCA Virtual Account (Simulasi)';
      if (selectedMethod === 'gopay') methodName = 'Midtrans GoPay (Simulasi)';

      payInvoiceWithMidtrans(invoice.id, methodName);
      setIsProcessing(false);
      onClose();

      // Open receipt automatically with standard timestamp
      setActiveReceiptInvoice({
        ...invoice,
        status: 'paid',
        payment_method: methodName,
        paid_at: new Date().toISOString()
      });
    }, 1000);
  };

  const copyVA = () => {
    navigator.clipboard.writeText(virtualAccountNumber.replace(/\s+/g, ''));
    setCopied(true);
    showToast('Nomor Virtual Account simulasi berhasil disalin!', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="midtrans-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
        {/* Midtrans Header Bar */}
        <div className="bg-[#002855] text-white p-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white p-1 flex items-center justify-center">
              <span className="font-extrabold text-[#002855] text-xs tracking-tighter font-mono">
                SNAP
              </span>
            </div>
            <div>
              <p className="text-xs font-semibold text-sky-200">Payment Gateway Demo</p>
              <h3 id="midtrans-modal-title" className="text-sm font-bold tracking-tight">
                Midtrans Snap Portal (Simulasi)
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup dialog pembayaran"
            className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Clear Demo Disclaimer Banner as requested in code review */}
        <div className="bg-amber-50 px-4 py-2.5 border-b border-amber-200 text-amber-900 text-xs flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
          <p className="leading-snug">
            <strong>Demo Simulasi Frontend:</strong> Transaksi ini hanya untuk pengujian alur antarmuka dan <em>tidak memproses uang nyata</em>.
          </p>
        </div>

        {/* Invoice Summary Banner */}
        <div className="bg-slate-50 p-4 sm:px-6 border-b border-slate-200/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Total Pembayaran
            </span>
            <p className="text-xl sm:text-2xl font-extrabold text-blue-700 font-['Outfit',sans-serif]">
              {formatCurrencyIDR(invoice.amount)}
            </p>
          </div>
          <div className="text-right">
            <span className="text-[11px] font-semibold text-slate-700 block">
              {invoice.title}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              {invoice.invoice_no}
            </span>
          </div>
        </div>

        {/* Method Selector Tabs */}
        <div className="p-4 sm:p-6 space-y-4 max-h-[55vh] overflow-y-auto">
          <p className="text-xs font-bold text-slate-700">Pilih Metode Pembayaran Demo:</p>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setSelectedMethod('qris')}
              className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all ${
                selectedMethod === 'qris'
                  ? 'border-blue-600 bg-blue-50/50 text-blue-700 shadow-sm ring-1 ring-blue-600'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-600'
              }`}
            >
              <QrCode className="w-5 h-5" />
              <span className="text-xs font-bold">QRIS</span>
            </button>

            <button
              onClick={() => setSelectedMethod('bca_va')}
              className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all ${
                selectedMethod === 'bca_va'
                  ? 'border-blue-600 bg-blue-50/50 text-blue-700 shadow-sm ring-1 ring-blue-600'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-600'
              }`}
            >
              <Building className="w-5 h-5" />
              <span className="text-xs font-bold">BCA VA</span>
            </button>

            <button
              onClick={() => setSelectedMethod('gopay')}
              className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all ${
                selectedMethod === 'gopay'
                  ? 'border-blue-600 bg-blue-50/50 text-blue-700 shadow-sm ring-1 ring-blue-600'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-600'
              }`}
            >
              <Smartphone className="w-5 h-5" />
              <span className="text-xs font-bold">GoPay</span>
            </button>
          </div>

          {/* Details based on selection */}
          {selectedMethod === 'qris' && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col items-center text-center space-y-3">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                Simulasi Kode QRIS
              </span>

              <div className="p-3 bg-white rounded-2xl shadow-md border border-slate-200 flex flex-col items-center">
                <div className="w-40 h-40 bg-slate-900 rounded-xl flex flex-col items-center justify-center p-3 relative overflow-hidden">
                  <div className="absolute inset-2 border-2 border-dashed border-white/40 rounded-lg flex items-center justify-center">
                    <QrCode className="w-28 h-28 text-white" />
                  </div>
                  <div className="absolute bg-white px-2 py-0.5 rounded text-[8px] font-extrabold text-blue-900 shadow">
                    QRIS DEMO
                  </div>
                </div>
                <p className="text-[10px] font-semibold text-slate-500 mt-2 font-mono">
                  NMID: ID102026889218 (Sandbox)
                </p>
              </div>

              <p className="text-[11px] text-slate-500 max-w-xs">
                Peragakan alur pembayaran mobile banking / dompet digital.
              </p>
            </div>
          )}

          {selectedMethod === 'bca_va' && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <span className="text-xs font-bold text-slate-700 block">
                Nomor Virtual Account Simulasi:
              </span>
              <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                <span className="text-base sm:text-lg font-mono font-extrabold text-blue-900 tracking-wider">
                  {virtualAccountNumber}
                </span>
                <button
                  onClick={copyVA}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Tersalin' : 'Salin'}
                </button>
              </div>
              <div className="text-[11px] text-slate-500 space-y-1">
                <p>1. Buka m-BCA atau KlikBCA &gt; Transfer &gt; BCA Virtual Account</p>
                <p>2. Tagihan atas nama: <strong>{invoice.student_name}</strong></p>
              </div>
            </div>
          )}

          {selectedMethod === 'gopay' && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col items-center text-center space-y-2">
              <Smartphone className="w-10 h-10 text-emerald-600 mt-1" />
              <p className="text-xs font-bold text-slate-800">
                Simulasi Integrasi GoPay Deeplink
              </p>
              <p className="text-[11px] text-slate-500">
                Dalam implementasi riwayat nyata, aplikasi akan membuka URL pembayaran resmi dari penyedia.
              </p>
            </div>
          )}

          {/* Architectural Backend Disclaimer Notice */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-100 border border-slate-200 text-[11px] text-slate-600">
            <Server className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Catatan Arsitektur Produksi:</strong> Frontend tidak menentukan status pembayaran secara mandiri. Di backend NestJS, transaksi divalidasi ke Midtrans Server API, dan status lunas hanya dicatat setelah verifikasi webhook dengan signature SHA-512.
            </p>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-4 sm:px-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            Tutup
          </button>
          <button
            onClick={handleSimulateSuccess}
            disabled={isProcessing}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <Clock className="w-4 h-4 animate-spin" />
                <span>Menyimpan State Pembayaran Demo...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Simulasikan Pembayaran Berhasil (Demo)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
