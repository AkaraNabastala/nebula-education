import React, { useState } from 'react';
import {
  CreditCard,
  Plus,
  Filter,
  Download,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Building,
  Zap,
  ArrowUpRight,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { InvoiceStatus, Invoice } from '../types';
import { financeService } from '../services/financeService';
import { assignmentService } from '../services/assignmentService';
import { formatDateID, formatCurrencyIDR } from '../utils/formatters';

export const KeuanganModule: React.FC = () => {
  const {
    invoices,
    students,
    payInvoiceCash,
    setActiveMidtransInvoice,
    setActiveReceiptInvoice,
    addNewInvoice,
    showToast,
    role,
    currentUser
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  // Form state for new invoice
  const [formStudentId, setFormStudentId] = useState(students[0]?.id || '');
  const [formTitle, setFormTitle] = useState('SPP Bulan Desember 2026');
  const [formCategory, setFormCategory] = useState<'SPP' | 'Uang Gedung' | 'Kegiatan' | 'Ujian' | 'Praktikum'>('SPP');
  const [formAmount, setFormAmount] = useState('350000');
  const [formDueDate, setFormDueDate] = useState('2026-12-10');
  const [formDescription, setFormDescription] = useState('Iuran Penyelenggaraan Pendidikan (SPP) Reguler');
  const [formError, setFormError] = useState<string | null>(null);

  // Check permission & scope: requires MANAGE_FINANCE permission with institutional scope
  const hasFinanceAccess = assignmentService.hasPermission(
    currentUser,
    'MANAGE_FINANCE',
    { type: 'institusi' }
  );

  const filteredInvoices = invoices.filter(inv => {
    if (statusFilter !== 'all' && inv.status !== statusFilter) return false;
    if (selectedClass !== 'all' && inv.class_name !== selectedClass) return false;
    if (search.trim() !== '') {
      const q = search.toLowerCase();
      return (
        inv.student_name.toLowerCase().includes(q) ||
        inv.invoice_no.toLowerCase().includes(q) ||
        inv.title.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalPaid = invoices
    .filter(i => i.status === 'paid')
    .reduce((sum, i) => sum + i.amount, 0);

  const totalOverdue = invoices
    .filter(i => i.status === 'overdue')
    .reduce((sum, i) => sum + i.amount, 0);

  const totalUpcoming = invoices
    .filter(i => i.status === 'upcoming')
    .reduce((sum, i) => sum + i.amount, 0);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const parsedAmount = Number(formAmount);
    if (!formAmount || isNaN(parsedAmount) || parsedAmount <= 0) {
      setFormError('Nominal tagihan harus berupa angka positif lebih dari Rp 0.');
      return;
    }

    if (!formTitle.trim()) {
      setFormError('Nama tagihan wajib diisi.');
      return;
    }

    if (!formDueDate) {
      setFormError('Tanggal jatuh tempo wajib ditentukan.');
      return;
    }

    const st = students.find(s => s.id === formStudentId) || students[0];
    if (!st) {
      setFormError('Pilih siswa yang terdaftar.');
      return;
    }

    addNewInvoice({
      student_id: st.id,
      student_name: st.name,
      student_nisn: st.nisn,
      class_name: st.class_name,
      title: formTitle.trim(),
      description: formDescription.trim(),
      amount: parsedAmount,
      amount_paid: 0,
      due_date: formDueDate,
      status: 'upcoming',
      category: formCategory
    });

    setShowCreateModal(false);
    setFormError(null);
  };

  const handleExportCSV = () => {
    financeService.exportInvoicesCsv(filteredInvoices);
    showToast('File CSV Laporan Keuangan berhasil diunduh dengan sanitasi formula!', 'success');
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Top Banner / Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-blue-100">Total SPP Terbayar (Lunas)</span>
            <CheckCircle2 className="w-5 h-5 text-blue-200" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold mt-3 font-['Outfit']">
            {formatCurrencyIDR(totalPaid)}
          </p>
          <p className="text-[11px] text-blue-200 mt-1">
            {invoices.filter(i => i.status === 'paid').length} transaksi terverifikasi
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 text-white shadow-lg shadow-slate-900/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300">Tunggakan Belum Dibayar</span>
            <AlertCircle className="w-5 h-5 text-rose-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold mt-3 font-['Outfit'] text-rose-300">
            {formatCurrencyIDR(totalOverdue)}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            Perlu penagihan & pengingat orang tua
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white/80 backdrop-blur-md border border-white/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">Tagihan Bulan Berjalan</span>
            <Clock className="w-5 h-5 text-sky-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold mt-3 font-['Outfit'] text-slate-900">
            {formatCurrencyIDR(totalUpcoming)}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Jatuh tempo tanggal 10 bulan ini
          </p>
        </div>
      </div>

      {/* Main Billing Card */}
      <div className="p-6 rounded-[32px] bg-white/80 backdrop-blur-md border border-white/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)]">
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
                Manajemen SPP & Tagihan Sekolah
              </h3>
              {hasFinanceAccess && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Otoritas Bendahara Aktif
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500">
              Mendukung pembayaran online Midtrans Snap (QRIS, VA Bank) dan pembayaran tunai kasir sekolah
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Ekspor CSV Aman
            </button>

            {hasFinanceAccess && (
              <button
                onClick={() => {
                  setFormError(null);
                  setShowCreateModal(true);
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/25 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Terbitkan Tagihan Baru
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-5 p-3 rounded-2xl bg-slate-50/80 border border-slate-200/80">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari nama siswa atau no. tagihan..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex items-center gap-1">
            {['all', 'upcoming', 'paid', 'overdue'].map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === st
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {st === 'all' && 'Semua'}
                {st === 'upcoming' && 'Upcoming'}
                {st === 'paid' && 'Paid (Lunas)'}
                {st === 'overdue' && 'Overdue'}
              </button>
            ))}
          </div>
        </div>

        {/* Invoices Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3 px-3">No. Invoice</th>
                <th className="py-3 px-3">Siswa & Kelas</th>
                <th className="py-3 px-3">Tagihan</th>
                <th className="py-3 px-3">Jatuh Tempo</th>
                <th className="py-3 px-3">Nominal</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Aksi Pembayaran</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredInvoices.map(inv => {
                const isPaid = inv.status === 'paid';
                return (
                  <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-3 font-mono font-bold text-slate-800">
                      {inv.invoice_no}
                    </td>
                    <td className="py-3.5 px-3">
                      <p className="font-bold text-slate-900">{inv.student_name}</p>
                      <p className="text-[11px] text-slate-400">
                        NISN: {inv.student_nisn} • {inv.class_name}
                      </p>
                    </td>
                    <td className="py-3.5 px-3">
                      <p className="font-semibold text-slate-800">{inv.title}</p>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {inv.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-600">
                      {formatDateID(inv.due_date)}
                    </td>
                    <td className="py-3.5 px-3 font-bold text-slate-900 font-mono">
                      {formatCurrencyIDR(inv.amount)}
                    </td>
                    <td className="py-3.5 px-3">
                      {isPaid && (
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-blue-600 text-white shadow-sm">
                          Paid
                        </span>
                      )}
                      {inv.status === 'upcoming' && (
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#e0effa] text-[#1e6091]">
                          Upcoming
                        </span>
                      )}
                      {inv.status === 'overdue' && (
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-700">
                          Overdue
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {isPaid ? (
                          <button
                            onClick={() => setActiveReceiptInvoice(inv)}
                            className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                            title="Cetak Kuitansi"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            Kuitansi
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => setActiveMidtransInvoice(inv)}
                              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold flex items-center gap-1 shadow-sm transition-all cursor-pointer"
                            >
                              <Zap className="w-3.5 h-3.5 fill-current" />
                              Midtrans Snap
                            </button>
                            {hasFinanceAccess && (
                              <button
                                onClick={() => payInvoiceCash(inv.id)}
                                className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                                title="Catat Bayar Tunai di Kasir Sekolah"
                              >
                                Kasir Tunai
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Terbitkan Tagihan Baru */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 w-full max-w-md">
            <h3 className="text-base font-bold text-slate-900 mb-2 font-['Outfit']">
              Terbitkan Tagihan Baru
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Buat tagihan SPP atau biaya sekolah lainnya untuk siswa terpilih.
            </p>

            {formError && (
              <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreateSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Pilih Siswa</label>
                <select
                  value={formStudentId}
                  onChange={e => setFormStudentId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.class_name} - {s.nisn})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nama Tagihan</label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                  placeholder="Contoh: SPP Bulan Desember 2026"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Kategori</label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                  >
                    <option value="SPP">SPP Bulanan</option>
                    <option value="Praktikum">Praktikum Lab</option>
                    <option value="Kegiatan">Kegiatan / Wisata</option>
                    <option value="Ujian">Asesmen Ujian</option>
                    <option value="Uang Gedung">Uang Gedung</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nominal (IDR)</label>
                  <input
                    type="number"
                    min="1000"
                    step="1000"
                    value={formAmount}
                    onChange={e => setFormAmount(e.target.value)}
                    placeholder="350000"
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono font-bold"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Jatuh Tempo (ISO Date)</label>
                <input
                  type="date"
                  value={formDueDate}
                  onChange={e => setFormDueDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Deskripsi / Catatan</label>
                <input
                  type="text"
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  placeholder="Keterangan tagihan..."
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-500/25 cursor-pointer"
                >
                  Terbitkan Tagihan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
