import React, { useState } from 'react';
import {
  FileText,
  Save,
  Award,
  Printer,
  Search,
  Filter,
  CheckCircle2,
  TrendingUp,
  Download
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Student } from '../types';

export const PenilaianModule: React.FC = () => {
  const { assessment, updateScore, setActiveRaporStudent, students, showToast, role } = useApp();

  const [scores, setScores] = useState(assessment.scores);
  const [selectedClass, setSelectedClass] = useState('XI MIPA 1');
  const [search, setSearch] = useState('');

  const handleScoreChange = (
    studentId: string,
    field: 'tugas1' | 'tugas2' | 'uts' | 'uas',
    value: string
  ) => {
    const num = Math.min(100, Math.max(0, parseInt(value) || 0));
    setScores(prev =>
      prev.map(sc => {
        if (sc.student_id === studentId) {
          const updated = { ...sc, [field]: num };
          const finalScore = Math.round(
            (updated.tugas1 * 0.2) + (updated.tugas2 * 0.2) + (updated.uts * 0.3) + (updated.uas * 0.3)
          );
          let predicate: 'A' | 'B' | 'C' | 'D' = 'D';
          if (finalScore >= 88) predicate = 'A';
          else if (finalScore >= 78) predicate = 'B';
          else if (finalScore >= 68) predicate = 'C';

          return { ...updated, final_score: finalScore, predicate };
        }
        return sc;
      })
    );
  };

  const handleNotesChange = (studentId: string, notes: string) => {
    setScores(prev =>
      prev.map(sc => (sc.student_id === studentId ? { ...sc, notes } : sc))
    );
  };

  const handleSaveAll = () => {
    scores.forEach(sc => {
      updateScore(sc.student_id, sc.tugas1, sc.tugas2, sc.uts, sc.uas, sc.notes);
    });
    showToast('Seluruh nilai asesmen siswa berhasil disimpan & dikunci!', 'success');
  };

  const handlePrintRapor = (studentId: string) => {
    const student = students.find(s => s.id === studentId) || students[0];
    setActiveRaporStudent(student);
  };

  const filteredScores = scores.filter(sc =>
    sc.student_name.toLowerCase().includes(search.toLowerCase()) ||
    sc.student_nisn.includes(search)
  );

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Header Card */}
      <div className="p-6 rounded-[32px] bg-white/80 backdrop-blur-md border border-white/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 text-xs font-bold">
              {assessment.subject_name}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Kelas: {assessment.class_name} • KKM: {assessment.kkm}
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-['Outfit'] mt-1">
            Penilaian Hasil Belajar & Manajemen E-Rapor
          </h3>
          <p className="text-xs text-slate-500">
            Formula Bobot: Tugas 1 (20%) + Tugas 2 (20%) + UTS (30%) + UAS (30%)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveAll}
            className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all"
          >
            <Save className="w-4 h-4" />
            Simpan Nilai Asesmen
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="p-6 rounded-[32px] bg-white/80 backdrop-blur-md border border-white/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)]">
        {/* Search */}
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari siswa..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
            />
          </div>
          <span className="text-xs text-slate-500 font-semibold">
            {filteredScores.length} Siswa Terdaftar
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3 px-3">Nama Siswa / NISN</th>
                <th className="py-3 px-2 text-center w-20">Tugas 1 (20%)</th>
                <th className="py-3 px-2 text-center w-20">Tugas 2 (20%)</th>
                <th className="py-3 px-2 text-center w-20">UTS (30%)</th>
                <th className="py-3 px-2 text-center w-20">UAS (30%)</th>
                <th className="py-3 px-2 text-center w-20">Nilai Akhir</th>
                <th className="py-3 px-2 text-center w-16">Predikat</th>
                <th className="py-3 px-3">Deskripsi Capaian Kompetensi</th>
                <th className="py-3 px-3 text-right">E-Rapor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredScores.map(sc => (
                <tr key={sc.student_id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-3">
                    <p className="font-bold text-slate-900">{sc.student_name}</p>
                    <p className="text-[11px] text-slate-400 font-mono">NISN: {sc.student_nisn}</p>
                  </td>
                  <td className="py-3.5 px-2 text-center">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={sc.tugas1}
                      onChange={e => handleScoreChange(sc.student_id, 'tugas1', e.target.value)}
                      className="w-16 py-1 px-1.5 text-center font-mono font-bold rounded-lg border border-slate-200 bg-white focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="py-3.5 px-2 text-center">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={sc.tugas2}
                      onChange={e => handleScoreChange(sc.student_id, 'tugas2', e.target.value)}
                      className="w-16 py-1 px-1.5 text-center font-mono font-bold rounded-lg border border-slate-200 bg-white focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="py-3.5 px-2 text-center">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={sc.uts}
                      onChange={e => handleScoreChange(sc.student_id, 'uts', e.target.value)}
                      className="w-16 py-1 px-1.5 text-center font-mono font-bold rounded-lg border border-slate-200 bg-white focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="py-3.5 px-2 text-center">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={sc.uas}
                      onChange={e => handleScoreChange(sc.student_id, 'uas', e.target.value)}
                      className="w-16 py-1 px-1.5 text-center font-mono font-bold rounded-lg border border-slate-200 bg-white focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="py-3.5 px-2 text-center">
                    <span className="font-extrabold text-sm font-mono text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                      {sc.final_score}
                    </span>
                  </td>
                  <td className="py-3.5 px-2 text-center">
                    <span
                      className={`inline-block w-7 h-7 leading-7 rounded-full text-xs font-black text-white ${
                        sc.predicate === 'A'
                          ? 'bg-blue-600'
                          : sc.predicate === 'B'
                          ? 'bg-emerald-600'
                          : sc.predicate === 'C'
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                    >
                      {sc.predicate}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <input
                      type="text"
                      value={sc.notes}
                      onChange={e => handleNotesChange(sc.student_id, e.target.value)}
                      className="w-full py-1 px-2.5 rounded-lg border border-slate-200 text-xs text-slate-600"
                    />
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => handlePrintRapor(sc.student_id)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors ml-auto"
                      title="Lihat & Cetak Rapor Siswa"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      Cetak Rapor
                    </button>
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
