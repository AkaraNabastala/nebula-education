import React, { useState } from 'react';
import {
  Compass,
  Users,
  Clock,
  MapPin,
  Plus,
  CheckCircle2,
  Calendar,
  Search,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const EkstrakurikulerModule: React.FC = () => {
  const { extracurriculars, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [attendanceSaved, setAttendanceSaved] = useState<string | null>(null);

  const categories = ['all', 'Sains & Teknologi', 'Olahraga', 'Kepemimpinan', 'Seni & Budaya'];

  const filteredEkskul = extracurriculars.filter(e => {
    if (selectedCategory !== 'all' && e.category !== selectedCategory) return false;
    if (search && !e.name.toLowerCase().includes(search.toLowerCase()) && !e.coach_name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleSimulateAttendance = (ekskulName: string) => {
    setAttendanceSaved(ekskulName);
    showToast(`Presensi kehadiran anggota ekstrakurikuler "${ekskulName}" berhasil dicatat oleh pembina!`, 'success');
    setTimeout(() => setAttendanceSaved(null), 3000);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Header */}
      <div className="p-6 rounded-[32px] bg-white/80 backdrop-blur-md border border-white/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-700">
              <Compass className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
              Manajemen Kegiatan & Ekstrakurikuler Siswa
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Pengelolaan divisi ekstrakurikuler, pembina resmi, jadwal latihan rutin, dan presensi anggota
          </p>
        </div>

        <button
          onClick={() => showToast('Form pendaftaran anggota ekstrakurikuler baru dibuka!', 'info')}
          className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all"
        >
          <Plus className="w-4 h-4" />
          Daftar Ekstrakurikuler
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white/80 text-slate-600 hover:bg-white border border-slate-200'
            }`}
          >
            {cat === 'all' ? 'Semua Divisi' : cat}
          </button>
        ))}
      </div>

      {/* Ekstrakurikuler Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEkskul.map(ek => (
          <div
            key={ek.id}
            className="p-6 rounded-[28px] bg-white/80 backdrop-blur-md border border-white/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)] hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700">
                  {ek.category}
                </span>
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1 font-mono">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  {ek.total_members} Anggota
                </span>
              </div>

              <div className="mt-3 space-y-2">
                <h4 className="text-base font-extrabold text-slate-900 leading-snug font-['Outfit']">
                  {ek.name}
                </h4>

                <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                  <p className="flex items-center gap-2">
                    <span className="text-slate-400 font-medium">Pembina:</span>
                    <strong className="text-slate-800">{ek.coach_name}</strong>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{ek.schedule}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-mono text-slate-700">{ek.room}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Aktif Semester Ini
              </span>
              <button
                onClick={() => handleSimulateAttendance(ek.name)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-xs font-semibold transition-colors"
              >
                Input Presensi
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
