import React from 'react';
import {
  Users,
  Maximize2,
  Share2,
  Wallet,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MetricCards: React.FC = () => {
  const { students, invoices, journals, themeMode } = useApp();

  const isCrowz = themeMode === 'crowz';

  const totalStudents = students.length * 156; // Representative realistic school count
  const paidInvoices = invoices.filter(i => i.status === 'paid');
  const totalRevenue = paidInvoices.reduce((acc, curr) => acc + curr.amount, 0) + 198250000;

  const formattedRevenue = (totalRevenue / 1000000).toFixed(1);

  const cards = [
    {
      icon: Users,
      value: `${totalStudents.toLocaleString('id-ID')}`,
      change: '12%',
      isPositive: true,
      title: 'Siswa Aktif Terdaftar',
      subtitle: 'Semua rombel & jurusan'
    },
    {
      icon: Maximize2,
      value: '98.4%',
      change: '0.4%',
      isPositive: false,
      title: 'Presensi Siswa Hari Ini',
      subtitle: 'Tingkat kehadiran sekolah'
    },
    {
      icon: Share2,
      value: `${journals.length + 32} Sesi`,
      change: '1.2%',
      isPositive: true,
      title: 'Jurnal Guru Terisi',
      subtitle: 'Pelaksanaan KBM pekan ini'
    },
    {
      icon: Wallet,
      value: `Rp ${formattedRevenue} Jt`,
      change: '12%',
      isPositive: true,
      title: 'Penerimaan SPP Terkumpul',
      subtitle: 'Bulan berjalan (Midtrans & Kasir)'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`p-5 rounded-[28px] border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-between ${
              isCrowz
                ? 'bg-white/90 border-orange-200/60 shadow-sm'
                : 'bg-white/80 backdrop-blur-md border-white/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)]'
            }`}
          >
            {/* Left: Soft Circular Icon Container */}
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                  isCrowz
                    ? 'bg-orange-100/70 text-[#d97453]'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                <Icon className="w-5 h-5 stroke-[2.2]" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
                    {card.value}
                  </span>
                  <span
                    className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      card.isPositive
                        ? isCrowz
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-[#6366f1]/15 text-[#4f46e5]'
                        : 'bg-slate-900 text-white'
                    }`}
                  >
                    {card.isPositive ? (
                      <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 stroke-[2.5]" />
                    )}
                    {card.change}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-500 mt-1 leading-snug">
                  {card.title}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
