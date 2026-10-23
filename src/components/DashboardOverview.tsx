import React from 'react';
import {
  Building2,
  ArrowUpRight,
  MoreHorizontal,
  FileText,
  MapPin,
  Phone,
  CreditCard,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { MetricCards } from './MetricCards';
import { useApp } from '../context/AppContext';

export const DashboardOverview: React.FC = () => {
  const {
    invoices,
    setActiveMidtransInvoice,
    setActiveReceiptInvoice,
    setActiveTab,
    announcements,
    themeMode,
    role
  } = useApp();

  const isCrowz = themeMode === 'crowz';

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* 4 Metric Cards */}
      <MetricCards />

      {/* Main 2-Column Grid matching image_5e5219fa.png */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full">
        {/* Left Column (8 cols): Revenue Information & Payment History */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          {/* Section: Revenue & Academic Statistics Card */}
          <div
            className={`p-6 rounded-[32px] border ${
              isCrowz
                ? 'bg-white/90 border-orange-200/60 shadow-sm'
                : 'bg-white/80 backdrop-blur-md border-white/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)]'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-slate-100 text-slate-800">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-['Outfit',sans-serif]">
                  Informasi Finansial & Operasional
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('keuangan')}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors"
                  title="Lihat Detail Keuangan"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <button
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 4 Subcards Grid - Exactly matching reference image 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card 1: Electric Blue Card */}
              <div
                onClick={() => setActiveTab('keuangan')}
                className="relative overflow-hidden p-5 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white cursor-pointer shadow-lg shadow-blue-500/20 hover:scale-[1.01] transition-transform group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold text-blue-100">
                      Penerimaan SPP Kelas X & XI
                    </p>
                    <p className="text-[11px] text-blue-200">Semester Ganjil 2026/2027</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-45 transition-transform">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold tracking-tight font-['Outfit',sans-serif]">
                    Rp 142.8 Jt
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-white/25 text-[11px] font-bold text-white flex items-center gap-0.5">
                    <ArrowUpRight className="w-3 h-3" /> 12%
                  </span>
                </div>
                <p className="text-[10px] text-blue-200 mt-2 font-medium">
                  Update 1 jam lalu via Midtrans Auto-Sync
                </p>
              </div>

              {/* Card 2: Jet Black Card */}
              <div
                onClick={() => setActiveTab('keuangan')}
                className="relative overflow-hidden p-5 rounded-2xl bg-slate-900 text-white cursor-pointer shadow-lg shadow-slate-900/20 hover:scale-[1.01] transition-transform group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-300">
                      Tunggakan Belum Terbayar
                    </p>
                    <p className="text-[11px] text-slate-400">Total 14 Siswa Menunggak</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:rotate-45 transition-transform">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold tracking-tight font-['Outfit',sans-serif]">
                    Rp 12.5 Jt
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-rose-500/30 text-[11px] font-bold text-rose-300 flex items-center gap-0.5">
                    <ArrowUpRight className="w-3 h-3" /> 4%
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 mt-2 font-medium">
                  Pengingat tagihan otomatis terkirim via WhatsApp
                </p>
              </div>

              {/* Card 3: Soft White Card 1 */}
              <div
                onClick={() => setActiveTab('keuangan')}
                className="p-5 rounded-2xl bg-slate-50/80 hover:bg-slate-100/80 border border-slate-200/80 text-slate-900 cursor-pointer transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-600">
                      Kas Operasional & Praktikum
                    </p>
                    <p className="text-[11px] text-slate-400">Lab Komputer, Fisika & Kimia</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-200/70 flex items-center justify-center group-hover:rotate-45 transition-transform">
                    <ArrowUpRight className="w-4 h-4 text-slate-700" />
                  </div>
                </div>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-['Outfit',sans-serif]">
                    Rp 68.4 Jt
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[11px] font-bold flex items-center gap-0.5">
                    <ArrowUpRight className="w-3 h-3" /> 12%
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 mt-2 font-medium">
                  Update 1 jam lalu
                </p>
              </div>

              {/* Card 4: Soft White Card 2 */}
              <div
                onClick={() => setActiveTab('keuangan')}
                className="p-5 rounded-2xl bg-slate-50/80 hover:bg-slate-100/80 border border-slate-200/80 text-slate-900 cursor-pointer transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-600">
                      Alokasi Kegiatan & Ekskul
                    </p>
                    <p className="text-[11px] text-slate-400">Robotik, OSN, Olahraga & Seni</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-200/70 flex items-center justify-center group-hover:rotate-45 transition-transform">
                    <ArrowUpRight className="w-4 h-4 text-slate-700" />
                  </div>
                </div>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-['Outfit',sans-serif]">
                    Rp 35.2 Jt
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[11px] font-bold flex items-center gap-0.5">
                    <ArrowUpRight className="w-3 h-3" /> 12%
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 mt-2 font-medium">
                  Update 1 jam lalu
                </p>
              </div>
            </div>
          </div>

          {/* Section: Payment History Table - Exactly matching reference image 1 */}
          <div
            className={`p-6 rounded-[32px] border ${
              isCrowz
                ? 'bg-white/90 border-orange-200/60 shadow-sm'
                : 'bg-white/80 backdrop-blur-md border-white/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)]'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-slate-100 text-slate-800">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-['Outfit',sans-serif]">
                    Riwayat Tagihan & Pembayaran SPP
                  </h3>
                  <p className="text-xs text-slate-500">
                    Daftar invoice resmi dan status transaksi terkini
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('keuangan')}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors"
                  title="Lihat Semua Tagihan"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <button
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="py-3 px-3">No. Invoice</th>
                    <th className="py-3 px-3">Siswa / Rombel</th>
                    <th className="py-3 px-3">Jatuh Tempo / Bayar</th>
                    <th className="py-3 px-3">Nominal</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {invoices.slice(0, 5).map(inv => {
                    const isPaid = inv.status === 'paid';
                    const isUpcoming = inv.status === 'upcoming';
                    const isOverdue = inv.status === 'overdue';

                    return (
                      <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors group">
                        <td className="py-3.5 px-3 font-semibold text-slate-900 flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isPaid ? 'bg-blue-600' : isUpcoming ? 'bg-sky-400' : 'bg-rose-500'
                            }`}
                          />
                          <span className="font-mono text-slate-700">{inv.invoice_no.replace('INV-2026-', '')}</span>
                        </td>
                        <td className="py-3.5 px-3">
                          <p className="font-bold text-slate-800">{inv.student_name}</p>
                          <p className="text-[11px] text-slate-400">{inv.class_name}</p>
                        </td>
                        <td className="py-3.5 px-3 text-slate-600">
                          {isPaid && inv.paid_at ? inv.paid_at.split(',')[0] : inv.due_date}
                        </td>
                        <td className="py-3.5 px-3 font-bold text-slate-900">
                          Rp {inv.amount.toLocaleString('id-ID')}
                        </td>
                        <td className="py-3.5 px-3">
                          {isPaid && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-blue-600 text-white shadow-sm">
                              Paid
                            </span>
                          )}
                          {isUpcoming && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-[#e0effa] text-[#1e6091]">
                              Upcoming
                            </span>
                          )}
                          {isOverdue && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-700">
                              Overdue
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          {isPaid ? (
                            <button
                              onClick={() => setActiveReceiptInvoice(inv)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                              title="Cetak Kuitansi Pembayaran"
                            >
                              <FileText className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => setActiveMidtransInvoice(inv)}
                              className="px-2.5 py-1 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold transition-all shadow-sm"
                            >
                              Bayar
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): School Information & Announcements/Potential List */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          {/* Card: School Information - Exactly matching reference image 1 */}
          <div
            className={`p-6 rounded-[32px] border ${
              isCrowz
                ? 'bg-white/90 border-orange-200/60 shadow-sm'
                : 'bg-white/80 backdrop-blur-md border-white/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)]'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-slate-800" />
                <h3 className="text-base font-bold text-slate-900 font-['Outfit',sans-serif]">
                  Informasi Sekolah
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('datainduk')}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* School Building Photo */}
            <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-4 shadow-sm group">
              <img
                src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80"
                alt="Gedung Sekolah Edutera"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
                <span className="text-white text-xs font-semibold drop-shadow">
                  Kampus Unggulan Terpadu
                </span>
              </div>
            </div>

            {/* School Profile Details */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-extrabold text-slate-900">
                  SMA Negeri 1 Edutera
                </h4>
                <span className="px-3 py-1 rounded-full bg-amber-300 text-amber-950 text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                  Akreditasi A
                </span>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>Jl. Pendidikan Nasional No. 45, Kebayoran, Jakarta Selatan 12190</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>+62 21 7892341 (Tata Usaha)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card: Agenda & Pengumuman Sekolah (School Potential List) */}
          <div
            className={`p-6 rounded-[32px] border ${
              isCrowz
                ? 'bg-white/90 border-orange-200/60 shadow-sm'
                : 'bg-white/80 backdrop-blur-md border-white/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)]'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-slate-800" />
                <h3 className="text-base font-bold text-slate-900 font-['Outfit',sans-serif]">
                  Agenda & Pengumuman
                </h3>
              </div>
              <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* List items with pill cards and arrow button */}
            <div className="space-y-3">
              {announcements.map(ann => (
                <div
                  key={ann.id}
                  className="p-3.5 rounded-2xl bg-slate-50/90 hover:bg-slate-100/90 border border-slate-200/60 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="pr-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-700">
                        {ann.tag}
                      </span>
                      <span className="text-[10px] text-slate-400">{ann.date}</span>
                    </div>
                    <p className="text-xs font-bold text-slate-800 mt-1 leading-snug line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {ann.title}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                      {ann.content}
                    </p>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-500 group-hover:text-blue-600 group-hover:rotate-45 transition-all shrink-0">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
