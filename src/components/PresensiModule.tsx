import React, { useState } from 'react';
import {
  CheckCircle2,
  Calendar,
  Users,
  Clock,
  BookOpen,
  Filter,
  Save,
  Check,
  AlertTriangle,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AttendanceStatus } from '../types';

export const PresensiModule: React.FC = () => {
  const { students, classes, subjects, showToast, role } = useApp();

  const [selectedClass, setSelectedClass] = useState('cls_xi_mipa1');
  const [selectedSubject, setSelectedSubject] = useState('sbj_01');
  const [date, setDate] = useState('2026-10-22');
  const [timeSlot, setTimeSlot] = useState('Jam ke 3-4 (08:45 - 10:15 WIB)');

  // Local state for student attendances in current session
  const [attendanceMap, setAttendanceMap] = useState<Record<string, AttendanceStatus>>({
    std_01: 'Hadir',
    std_02: 'Hadir',
    std_03: 'Hadir',
    std_04: 'Hadir',
    std_05: 'Sakit'
  });

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendanceMap(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleMarkAllPresent = () => {
    const updated: Record<string, AttendanceStatus> = {};
    students.forEach(s => {
      updated[s.id] = 'Hadir';
    });
    setAttendanceMap(updated);
    showToast('Seluruh siswa ditandai HADIR!', 'success');
  };

  const handleSaveAttendance = () => {
    showToast('Presensi Pembelajaran Sesi Terpilih berhasil disimpan dan disahkan ke sistem!', 'success');
  };

  const currentClassStudents = students.filter(s => s.class_id === selectedClass);

  // Calculate live session statistics
  const total = currentClassStudents.length || 1;
  const hadirCount = currentClassStudents.filter(s => (attendanceMap[s.id] || 'Hadir') === 'Hadir').length;
  const sakitCount = currentClassStudents.filter(s => attendanceMap[s.id] === 'Sakit').length;
  const izinCount = currentClassStudents.filter(s => attendanceMap[s.id] === 'Izin').length;
  const alpaCount = currentClassStudents.filter(s => attendanceMap[s.id] === 'Alpa').length;
  const terlambatCount = currentClassStudents.filter(s => attendanceMap[s.id] === 'Terlambat').length;

  const percentage = Math.round((hadirCount / total) * 100);

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Session Header & Selectors Card */}
      <div className="p-6 rounded-[32px] bg-white/80 backdrop-blur-md border border-white/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
              Presensi Pembelajaran Sesi Jam Mengajar
            </h3>
            <p className="text-xs text-slate-500">
              Input presensi siswa tatap muka per mata pelajaran dan jam pembelajaran aktif
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleMarkAllPresent}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <UserCheck className="w-4 h-4 text-emerald-600" />
              Tandai Semua Hadir
            </button>
            <button
              onClick={handleSaveAttendance}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/25 transition-all"
            >
              <Save className="w-4 h-4" />
              Simpan Presensi
            </button>
          </div>
        </div>

        {/* Filter Selection Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Rombongan Belajar / Kelas</label>
            <select
              value={selectedClass}
              onChange={e => setSelectedClass(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-800"
            >
              {classes.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.major})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Mata Pelajaran</label>
            <select
              value={selectedSubject}
              onChange={e => setSelectedSubject(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-800"
            >
              {subjects.map(sb => (
                <option key={sb.id} value={sb.id}>
                  {sb.name} ({sb.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Tanggal KBM</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-800"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Jam Pelajaran</label>
            <select
              value={timeSlot}
              onChange={e => setTimeSlot(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-800"
            >
              <option value="Jam ke 1-2 (07:00 - 08:30 WIB)">Jam ke 1-2 (07:00 - 08:30 WIB)</option>
              <option value="Jam ke 3-4 (08:45 - 10:15 WIB)">Jam ke 3-4 (08:45 - 10:15 WIB)</option>
              <option value="Jam ke 5-6 (10:30 - 12:00 WIB)">Jam ke 5-6 (10:30 - 12:00 WIB)</option>
              <option value="Jam ke 7-8 (13:00 - 14:30 WIB)">Jam ke 7-8 (13:00 - 14:30 WIB)</option>
            </select>
          </div>
        </div>

        {/* Live Attendance Stats Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mt-5 pt-4 border-t border-slate-100">
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200/60 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
              Hadir ({hadirCount})
            </span>
            <span className="text-lg font-extrabold text-emerald-900 font-['Outfit']">
              {percentage}%
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200/60 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">
              Sakit
            </span>
            <span className="text-lg font-extrabold text-amber-900 font-['Outfit']">
              {sakitCount} Siswa
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200/60 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block">
              Izin
            </span>
            <span className="text-lg font-extrabold text-blue-900 font-['Outfit']">
              {izinCount} Siswa
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200/60 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 block">
              Terlambat
            </span>
            <span className="text-lg font-extrabold text-purple-900 font-['Outfit']">
              {terlambatCount} Siswa
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200/60 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 block">
              Alpa / Tanpa Ket.
            </span>
            <span className="text-lg font-extrabold text-rose-900 font-['Outfit']">
              {alpaCount} Siswa
            </span>
          </div>
        </div>
      </div>

      {/* Student List with Attendance Toggles */}
      <div className="p-6 rounded-[32px] bg-white/80 backdrop-blur-md border border-white/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)]">
        <h4 className="text-sm font-bold text-slate-800 mb-3">
          Daftar Siswa Kelas {classes.find(c => c.id === selectedClass)?.name}
        </h4>

        <div className="divide-y divide-slate-100">
          {currentClassStudents.map((st, idx) => {
            const currentStatus = attendanceMap[st.id] || 'Hadir';

            return (
              <div
                key={st.id}
                className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-slate-50/70 p-2 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 text-center text-xs font-mono font-bold text-slate-400">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{st.name}</p>
                    <p className="text-[11px] text-slate-500 font-mono">
                      NISN: {st.nisn} • {st.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
                    </p>
                  </div>
                </div>

                {/* Status Selector Pills */}
                <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                  {(['Hadir', 'Sakit', 'Izin', 'Terlambat', 'Alpa'] as AttendanceStatus[]).map(status => {
                    const isSelected = currentStatus === status;
                    let activeClass = 'bg-blue-600 text-white';
                    if (status === 'Hadir') activeClass = 'bg-emerald-600 text-white shadow-sm';
                    if (status === 'Sakit') activeClass = 'bg-amber-600 text-white shadow-sm';
                    if (status === 'Izin') activeClass = 'bg-blue-600 text-white shadow-sm';
                    if (status === 'Terlambat') activeClass = 'bg-purple-600 text-white shadow-sm';
                    if (status === 'Alpa') activeClass = 'bg-rose-600 text-white shadow-sm';

                    return (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(st.id, status)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                          isSelected
                            ? activeClass
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {status}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
