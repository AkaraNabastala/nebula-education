import React, { useState } from 'react';
import {
  ArrowRightLeft,
  Users,
  Shuffle,
  CheckCircle2,
  AlertTriangle,
  History,
  Save,
  Layers,
  Sparkles,
  Download
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const KenaikanKelasModule: React.FC = () => {
  const { promotions, executePromotion, showToast, classes } = useApp();
  const [selectedMethod, setSelectedMethod] = useState<'fixed' | 'randomized'>('fixed');
  const [selectedSourceClass, setSelectedSourceClass] = useState('XI MIPA 1');
  const [targetYear, setTargetYear] = useState('2027/2028');

  const handleApply = () => {
    executePromotion(selectedMethod);
  };

  const naikCount = promotions.filter(p => p.status === 'Naik Kelas').length;
  const tinggalCount = promotions.filter(p => p.status === 'Tinggal Kelas').length;

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Header */}
      <div className="p-6 rounded-[32px] bg-white/80 backdrop-blur-md border border-white/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-700">
              <ArrowRightLeft className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
              Manajemen Kenaikan Kelas & Distribusi Rombel
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Penetapan status naik kelas, tinggal kelas, serta distribusi pembagian rombel tahun ajaran baru
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleApply}
            className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all"
          >
            <Save className="w-4 h-4" />
            Eksekusi & Sahkan Rombel Baru
          </button>
        </div>
      </div>

      {/* Method Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Method 1: Anggota Tetap */}
        <div
          onClick={() => setSelectedMethod('fixed')}
          className={`p-5 rounded-3xl border cursor-pointer transition-all ${
            selectedMethod === 'fixed'
              ? 'bg-blue-50/80 border-blue-600 ring-2 ring-blue-600/20 shadow-md'
              : 'bg-white/80 border-slate-200 hover:bg-white'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                M1
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Metode 1: Anggota Tetap (Kohesif)
                </h4>
                <p className="text-[11px] text-slate-500">
                  Siswa dipindahkan ke tingkat berikutnya dengan mempertahankan rombel yang sama
                </p>
              </div>
            </div>
            <span
              className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                selectedMethod === 'fixed'
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-slate-300'
              }`}
            >
              {selectedMethod === 'fixed' && <CheckCircle2 className="w-4 h-4" />}
            </span>
          </div>
          <div className="mt-3 text-xs text-slate-600 bg-white/70 p-2.5 rounded-xl border border-blue-100">
            Contoh: Siswa <strong>XI MIPA 1</strong> yang lulus kriteria otomatis naik bersama menjadi rombel <strong>XII MIPA 1</strong>.
          </div>
        </div>

        {/* Method 2: Rotasi / Pengacakan */}
        <div
          onClick={() => setSelectedMethod('randomized')}
          className={`p-5 rounded-3xl border cursor-pointer transition-all ${
            selectedMethod === 'randomized'
              ? 'bg-blue-50/80 border-blue-600 ring-2 ring-blue-600/20 shadow-md'
              : 'bg-white/80 border-slate-200 hover:bg-white'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                <Shuffle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Metode 2: Rotasi & Pengacakan Berimbang
                </h4>
                <p className="text-[11px] text-slate-500">
                  Siswa didistribusikan secara proporsional ke beberapa rombel tingkat tujuan
                </p>
              </div>
            </div>
            <span
              className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                selectedMethod === 'randomized'
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-slate-300'
              }`}
            >
              {selectedMethod === 'randomized' && <CheckCircle2 className="w-4 h-4" />}
            </span>
          </div>
          <div className="mt-3 text-xs text-slate-600 bg-white/70 p-2.5 rounded-xl border border-indigo-100">
            Algoritma otomatis menyeimbangkan jumlah siswa, persebaran nilai akademik, dan rasio gender antar kelas.
          </div>
        </div>
      </div>

      {/* Preview Table */}
      <div className="p-6 rounded-[32px] bg-white/80 backdrop-blur-md border border-white/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Pratinjau Hasil Penempatan Siswa Kelas {selectedSourceClass} &gt; TP {targetYear}
            </h4>
            <p className="text-xs text-slate-500">
              Total {promotions.length} siswa • {naikCount} Naik Kelas • {tinggalCount} Tinggal Kelas
            </p>
          </div>

          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
            Status: Siap Disahkan
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3 px-3">Nama Siswa</th>
                <th className="py-3 px-3">Kelas Asal</th>
                <th className="py-3 px-3">Status Kenaikan</th>
                <th className="py-3 px-3">Kelas Rekomendasi Tujuan</th>
                <th className="py-3 px-3">Pertimbangan Akademik & Catatan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {promotions.map((p, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-3 font-bold text-slate-900">
                    {p.student_name}
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-slate-600">
                    {p.current_class}
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                        p.status === 'Naik Kelas'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="font-extrabold text-blue-700 font-mono bg-blue-50 px-2.5 py-1 rounded-lg">
                      {p.target_class}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-500 text-[11px]">
                    {p.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
