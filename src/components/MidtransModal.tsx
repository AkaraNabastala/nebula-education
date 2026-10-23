import React, { useState } from 'react';
import {
  X,
  QrCode,
  CreditCard,
  Building,
  CheckCircle2,
  Copy,
  Clock,
  ShieldCheck,
  Smartphone,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Invoice } from '../types';

interface MidtransModalProps {
  invoice: Invoice;
  onClose: () => void;
}

export const MidtransModal: React.FC<MidtransModalProps> = ({ invoice, onClose }) => {
  const { payInvoiceWithMidtrans, showToast, setActiveReceiptInvoice } = useApp();
  const [selectedMethod, setSelectedMethod] = useState<'qris' | 'bca_va' | 'gopay'>('qris');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const virtualAccountNumber = `8277 0065 ${invoice.student_nisn.slice(-4)}`;

  const handleSimulateSuccess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      let methodName = 'Midtrans QRIS';
      if (selectedMethod === 'bca_va') methodName = 'Midtrans BCA Virtual Account';
      if (selectedMethod === 'gopay') methodName = 'Midtrans GoPay / E-Wallet';

      payInvoiceWithMidtrans(invoice.id, methodName);
      setIsProcessing(false);
      onClose();

      // Open receipt automatically
      setActiveReceiptInvoice({
        ...invoice,
        status: 'paid',
        payment_method: methodName,
        paid_at: '22 Okt 2026, 15:45 WIB'
      });
    }, 1200);
  };

  const copyVA = () => {
    navigator.clipboard.writeText(virtualAccountNumber.replace(/\s+/g, ''));
    setCopied(true);
    showToast('Nomor Virtual Account berhasil disalin!', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
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
              <p className="text-xs font-semibold text-sky-200">Payment Gateway Resmi</p>
              <h3 className="text-sm font-bold tracking-tight">Midtrans Payment Portal</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Invoice Summary Banner */}
        <div className="bg-slate-50 p-4 sm:px-6 border-b border-slate-200/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Total Pembayaran
            </span>
            <p className="text-xl sm:text-2xl font-extrabold text-blue-700 font-['Outfit',sans-serif]">
              Rp {invoice.amount.toLocaleString('id-ID')}
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
        <div className="p-4 sm:p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          <p className="text-xs font-bold text-slate-700">Pilih Metode Pembayaran:</p>

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
                Semua Dompet Digital & Mobile Banking
              </span>
              
              {/* Realistic QRIS Graphic */}
              <div className="p-3 bg-white rounded-2xl shadow-md border border-slate-200 flex flex-col items-center">
                <div className="w-44 h-44 bg-slate-900 rounded-xl flex flex-col items-center justify-center p-3 relative overflow-hidden">
                  <div className="absolute inset-2 border-2 border-dashed border-white/40 rounded-lg flex items-center justify-center">
                    <QrCode className="w-32 h-32 text-white" />
                  </div>
                  <div className="absolute bg-white px-2 py-0.5 rounded text-[9px] font-extrabold text-blue-900 shadow">
                    QRIS RESMI
                  </div>
                </div>
                <p className="text-[11px] font-semibold text-slate-600 mt-2 font-mono">
                  NMID: ID102026889218
                </p>
              </div>

              <p className="text-xs text-slate-500 max-w-xs">
                Scan kode QR di atas menggunakan aplikasi BCA Mobile, Livin, BRImo, GoPay, OVO, atau Dana.
              </p>
            </div>
          )}

          {selectedMethod === 'bca_va' && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <span className="text-xs font-bold text-slate-700 block">
                Nomor Virtual Account BCA:
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
                <p>2. Masukkan nomor di atas & periksa nama siswa: <strong>{invoice.student_name}</strong></p>
                <p>3. Konfirmasi pembayaran dan simpan bukti transfer.</p>
              </div>
            </div>
          )}

          {selectedMethod === 'gopay' && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col items-center text-center space-y-2">
              <Smartphone className="w-10 h-10 text-emerald-600 mt-1" />
              <p className="text-xs font-bold text-slate-800">
                Hubungkan dengan Aplikasi GoPay
              </p>
              <p className="text-[11px] text-slate-500">
                Setelah klik bayar, notifikasi pembayaran akan otomatis diteruskan ke aplikasi GoPay Anda.
              </p>
            </div>
          )}

          {/* Security & Sandbox Info */}
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-blue-50/60 border border-blue-100 text-[11px] text-blue-800">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              Simulasi Lingkungan Uji Midtrans Sandbox terverifikasi dengan SSL 256-bit enkripsi end-to-end.
            </span>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-4 sm:px-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleSimulateSuccess}
            disabled={isProcessing}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <Clock className="w-4 h-4 animate-spin" />
                <span>Memproses Webhook Midtrans...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Simulasikan Pembayaran Berhasil</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
