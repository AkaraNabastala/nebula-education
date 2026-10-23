import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Search,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const JurnalGuruModule: React.FC = () => {
  const { journals, addJournal, currentUser, classes, subjects, showToast } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [filterClass, setFilterClass] = useState('all');

  // Form states
  const [formClassId, setFormClassId] = useState('cls_xi_mipa1');
  const [formSubjectName, setFormSubjectName] = useState('Matematika Wajib');
  const [formDate, setFormDate] = useState('2026-10-22');
  const [formTimeSlot, setFormTimeSlot] = useState('Jam ke 3-4 (08:45 - 10:15)');
  const [formTopic, setFormTopic] = useState('');
  const [formCompetency, setFormCompetency] = useState('');
  const [formActivities, setFormActivities] = useState('');
  const [formMethod, setFormMethod] = useState('Problem Based Learning (PBL)');
  const [formObstacles, setFormObstacles] = useState('');

  const filteredJournals = journals.filter(j => {
    if (filterClass !== 'all' && j.class_id !== filterClass) return false;
    return true;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cl = classes.find(c => c.id === formClassId);
    addJournal({
      date: formDate,
      time_slot: formTimeSlot,
      class_id: formClassId,
      class_name: cl ? cl.name : 'XI MIPA 1',
      subject_name: formSubjectName,
      teacher_name: currentUser.name,
      topic: formTopic,
      learning_competency: formCompetency,
      activities_summary: formActivities,
      teaching_method: formMethod,
      obstacles_followup: formObstacles,
      status: 'Selesai',
      attendance_summary: {
        hadir: 35,
        sakit: 1,
        izin: 0,
        alpa: 0
      }
    });
    setShowAddModal(false);
    // Reset inputs
    setFormTopic('');
    setFormCompetency('');
    setFormActivities('');
    setFormObstacles('');
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Top Banner */}
      <div className="p-6 rounded-[32px] bg-white/80 backdrop-blur-md border border-white/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
            Jurnal Pelaksanaan Pembelajaran Guru
          </h3>
          <p className="text-xs text-slate-500">
            Catatan resmi materi KBM, capaian kompetensi, metode pengajaran, dan presensi kelas
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all"
        >
          <Plus className="w-4 h-4" />
          Isi Jurnal Mengajar Baru
        </button>
      </div>

      {/* Filter Tab */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setFilterClass('all')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            filterClass === 'all'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white/80 text-slate-600 border border-slate-200'
          }`}
        >
          Semua Kelas
        </button>
        {classes.map(c => (
          <button
            key={c.id}
            onClick={() => setFilterClass(c.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              filterClass === c.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white/80 text-slate-600 border border-slate-200'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Journals List */}
      <div className="space-y-4">
        {filteredJournals.map(journal => (
          <div
            key={journal.id}
            className="p-6 rounded-[28px] bg-white/80 backdrop-blur-md border border-white/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)] hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                      {journal.class_name}
                    </span>
                    <span className="text-xs font-extrabold text-slate-900">
                      {journal.subject_name}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Guru Pengampu: <strong className="text-slate-700">{journal.teacher_name}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {journal.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {journal.time_slot}
                </span>
              </div>
            </div>

            <div className="mt-4 space-y-3 text-xs text-slate-700">
              <div>
                <span className="font-bold text-slate-900 block mb-0.5">Materi Pembelajaran:</span>
                <p className="text-sm font-semibold text-blue-900 bg-blue-50/50 p-2 rounded-xl border border-blue-100">
                  {journal.topic}
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-900 block mb-0.5">Tujuan / Capaian Pembelajaran:</span>
                <p className="text-slate-600 leading-relaxed">{journal.learning_competency}</p>
              </div>

              <div>
                <span className="font-bold text-slate-900 block mb-0.5">Ringkasan Aktivitas KBM:</span>
                <p className="text-slate-600 leading-relaxed">{journal.activities_summary}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-slate-700 block mb-0.5">Metode Pembelajaran:</span>
                  <p className="text-slate-600">{journal.teaching_method}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-slate-700 block mb-0.5">Catatan & Kendala:</span>
                  <p className="text-slate-600">{journal.obstacles_followup}</p>
                </div>
              </div>
            </div>

            {/* Attendance Snapshot Footer */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                Status Jurnal: Terverifikasi & Disahkan
              </span>
              <div className="flex items-center gap-3">
                <span>Hadir: <strong className="text-slate-900">{journal.attendance_summary.hadir}</strong></span>
                <span>Sakit: <strong className="text-slate-900">{journal.attendance_summary.sakit}</strong></span>
                <span>Izin: <strong className="text-slate-900">{journal.attendance_summary.izin}</strong></span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add Journal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-slate-900 mb-4 font-['Outfit']">
              Formulir Jurnal Mengajar Harian
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Pilih Kelas</label>
                  <select
                    value={formClassId}
                    onChange={e => setFormClassId(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                  >
                    {classes.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Mata Pelajaran</label>
                  <input
                    type="text"
                    value={formSubjectName}
                    onChange={e => setFormSubjectName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tanggal</label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={e => setFormDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Jam Pelajaran</label>
                  <input
                    type="text"
                    value={formTimeSlot}
                    onChange={e => setFormTimeSlot(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Materi / Pokok Bahasan</label>
                <input
                  type="text"
                  value={formTopic}
                  onChange={e => setFormTopic(e.target.value)}
                  placeholder="Contoh: Turunan Fungsi Trigonometri & Nilai Ekstrim"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Tujuan Pembelajaran</label>
                <textarea
                  value={formCompetency}
                  onChange={e => setFormCompetency(e.target.value)}
                  rows={2}
                  placeholder="Siswa mampu menyelesaikan persamaan turunan..."
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Ringkasan Kegiatan KBM</label>
                <textarea
                  value={formActivities}
                  onChange={e => setFormActivities(e.target.value)}
                  rows={2}
                  placeholder="Penjelasan materi, tanya jawab kontekstual, latihan terbimbing..."
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Metode Pembelajaran</label>
                  <input
                    type="text"
                    value={formMethod}
                    onChange={e => setFormMethod(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Kendala & Solusi</label>
                  <input
                    type="text"
                    value={formObstacles}
                    onChange={e => setFormObstacles(e.target.value)}
                    placeholder="Bimbingan tutor sebaya..."
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-500/25"
                >
                  Simpan Jurnal KBM
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
