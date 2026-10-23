import React from 'react';
import { X, Printer, CheckCircle2, QrCode, Download } from 'lucide-react';
import { Invoice } from '../types';

interface PrintReceiptModalProps {
  invoice: Invoice;
  onClose: () => void;
}

export const PrintReceiptModal: React.FC<PrintReceiptModalProps> = ({ invoice, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top bar (hidden in print) */}
        <div className="p-4 px-6 bg-slate-900 text-white flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-bold">Bukti Kuitansi Pembayaran Sah</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4" />
              Cetak / Unduh PDF
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Body */}
        <div className="p-8 overflow-y-auto print:p-0 text-slate-800 text-sm font-sans" id="printable-receipt">
          {/* Header Kop Surat */}
          <div className="text-center pb-4 border-b-2 border-slate-900 flex items-center justify-between">
            <div className="w-16 h-16 rounded-xl bg-blue-600 text-white font-bold text-2xl flex items-center justify-center font-['Outfit']">
              ED
            </div>
            <div className="flex-1 px-4 text-center">
              <h2 className="text-lg font-black uppercase tracking-wider text-slate-900">
                SMA NEGERI 1 EDUTERA NUSANTARA
              </h2>
              <p className="text-xs text-slate-600 font-medium">
                Penyelenggara Pendidikan Terpadu • Akreditasi A (Unggul) • NPSN: 20108921
              </p>
              <p className="text-[11px] text-slate-500">
                Jl. Pendidikan Nasional No. 45, Kebayoran Baru, Jakarta Selatan | Telp: (021) 7892341
              </p>
            </div>
            <div className="w-16 h-16 border border-slate-200 rounded-lg flex flex-col items-center justify-center p-1">
              <QrCode className="w-10 h-10 text-slate-800" />
              <span className="text-[8px] font-mono text-slate-500 mt-0.5">VALID</span>
            </div>
          </div>

          <div className="text-center my-4">
            <h3 className="text-base font-black tracking-wider uppercase text-slate-900 underline underline-offset-4">
              KUITANSI PEMBAYARAN RESMI
            </h3>
            <p className="text-xs text-slate-500 font-mono mt-1">
              NO: {invoice.invoice_no}
            </p>
          </div>

          {/* Details Table */}
          <div className="grid grid-cols-2 gap-4 my-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <p className="text-xs text-slate-400 uppercase font-semibold">Telah Diterima Dari:</p>
              <p className="text-sm font-bold text-slate-900">{invoice.student_name}</p>
              <p className="text-xs text-slate-600">NISN: {invoice.student_nisn}</p>
              <p className="text-xs text-slate-600">Kelas: {invoice.class_name}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 uppercase font-semibold">Tanggal Pembayaran:</p>
              <p className="text-sm font-bold text-slate-900">{invoice.paid_at || '22 Okt 2026, 14:30 WIB'}</p>
              <p className="text-xs text-slate-600">Metode: {invoice.payment_method || 'Payment Gateway'}</p>
              <p className="text-xs font-bold text-emerald-600 uppercase mt-1">STATUS: LUNAS (SETTLED)</p>
            </div>
          </div>

          <table className="w-full border-collapse mb-6">
            <thead>
              <tr className="border-y border-slate-300 text-xs font-bold text-slate-700 bg-slate-100">
                <th className="py-2.5 px-3 text-left">No.</th>
                <th className="py-2.5 px-3 text-left">Rincian Pembayaran</th>
                <th className="py-2.5 px-3 text-left">Periode / Keterangan</th>
                <th className="py-2.5 px-3 text-right">Jumlah (IDR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              <tr>
                <td className="py-3 px-3">1</td>
                <td className="py-3 px-3 font-semibold text-slate-900">{invoice.title}</td>
                <td className="py-3 px-3 text-slate-600">{invoice.description}</td>
                <td className="py-3 px-3 text-right font-bold text-slate-900">
                  Rp {invoice.amount.toLocaleString('id-ID')}
                </td>
              </tr>
              <tr className="bg-slate-50 font-bold">
                <td colSpan={3} className="py-3 px-3 text-right uppercase">Total Pembayaran</td>
                <td className="py-3 px-3 text-right text-base text-blue-900 font-extrabold">
                  Rp {invoice.amount.toLocaleString('id-ID')}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Signatures & Stamps */}
          <div className="grid grid-cols-2 gap-8 pt-6 mt-6 border-t border-slate-200">
            <div className="text-xs text-slate-500">
              <p className="font-semibold text-slate-700 mb-1">Catatan Penting:</p>
              <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                <li>Kuitansi ini diterbitkan secara otomatis dan sah sebagai bukti pembayaran resmi sekolah.</li>
                <li>Simpan bukti kuitansi ini untuk keperluan administrasi dan pencetakan kartu ujian.</li>
              </ul>
            </div>
            <div className="text-center flex flex-col items-center">
              <p className="text-xs text-slate-500">Jakarta, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              <p className="text-xs font-semibold text-slate-700 mt-1">Petugas Kasir / Bendahara Sekolah</p>
              
              {/* Virtual Stamp */}
              <div className="my-2 border-2 border-dashed border-blue-600 text-blue-700 font-extrabold text-[11px] uppercase py-1 px-3 rounded transform -rotate-3">
                LUNAS / DIVERIFIKASI
              </div>

              <p className="text-xs font-bold text-slate-900 mt-2 underline">Sri Wahyuni, S.E.</p>
              <p className="text-[10px] text-slate-500">NIP. 19870314 201101 2 004</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
