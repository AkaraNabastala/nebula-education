import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  Printer,
  FileText,
  Calendar,
  Users,
  CreditCard,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LaporanModule: React.FC = () => {
  const { students, invoices, journals, assessment, showToast } = useApp();
  const [selectedReport, setSelectedReport] = useState('presensi');

  const handleExport = (type: string, format: 'PDF' | 'Excel' | 'CSV') => {
    showToast(`Laporan ${type} berhasil diekspor dalam format ${format}!`, 'success');
  };

  const reportCards = [
    {
      id: 'presensi',
      title: 'Laporan Rekapitulasi Presensi & Kehadiran',
      desc: 'Rekap kehadiran harian dan presensi pembelajaran per mata pelajaran seluruh rombel',
      icon: Users,
      stats: 'Tingkat Hadir Rata-rata 98.4%',
      tag: 'Kesiswaan & KBM'
    },
    {
      id: 'keuangan',
      title: 'Laporan Finansial SPP & Rekap Tunggakan',
      desc: 'Rincian penerimaan SPP online Midtrans, pembayaran kasir tunai, dan daftar siswa menunggak',
      icon: CreditCard,
      stats: 'Total Terkumpul Rp 198.5 Jt',
      tag: 'Keuangan'
    },
    {
      id: 'jurnal',
      title: 'Rekapitulasi Jurnal Mengajar Guru',
      desc: 'Arsip materi pembelajaran, metode, evaluasi kendala, dan jam tatap muka pengajar',
      icon: FileText,
      stats: `${journals.length + 32} Sesi Terlaksana`,
      tag: 'Kurikulum'
    },
    {
      id: 'nilai',
      title: 'Buku Leger Nilai & Asesmen Sumatif',
      desc: 'Kumpulan nilai tugas, ulangan harian, UTS, UAS, dan predikat capaian hasil belajar siswa',
      icon: FileSpreadsheet,
      stats: '5 Mapel Tuntas KKM',
      tag: 'Akademik'
    }
  ];

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Header */}
      <div className="p-6 rounded-[32px] bg-white/80 backdrop-blur-md border border-white/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-700">
              <FileSpreadsheet className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
              Pusat Dokumen & Ekspor Laporan Resmi
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Unduh laporan berkala format PDF resmi bercap sekolah, spreadsheet Excel, atau pertukaran data CSV
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExport('Semua Berkas Semester Ganjil', 'PDF')}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4" />
            Cetak Bundle PDF
          </button>
        </div>
      </div>

      {/* Grid of Available Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reportCards.map(rep => {
          const Icon = rep.icon;
          return (
            <div
              key={rep.id}
              className="p-6 rounded-[28px] bg-white/80 backdrop-blur-md border border-white/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)] hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700">
                    {rep.tag}
                  </span>
                  <span className="text-xs font-bold text-slate-900 font-mono">
                    {rep.stats}
                  </span>
                </div>

                <div className="flex items-start gap-3.5 mt-4">
                  <div className="w-11 h-11 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 font-['Outfit'] leading-snug">
                      {rep.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {rep.desc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleExport(rep.title, 'CSV')}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  CSV
                </button>
                <button
                  onClick={() => handleExport(rep.title, 'Excel')}
                  className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Excel (XLSX)
                </button>
                <button
                  onClick={() => handleExport(rep.title, 'PDF')}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1 transition-colors shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Cetak PDF
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
