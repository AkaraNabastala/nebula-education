import React, { useState } from 'react';
import {
  Layers,
  Users,
  GraduationCap,
  BookOpen,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Trash2,
  Edit2,
  Download
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Student } from '../types';

export const DataIndukModule: React.FC = () => {
  const { students, teachers, classes, subjects, addNewStudent, showToast, role } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'siswa' | 'guru' | 'kelas' | 'mapel'>('siswa');
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Student form states
  const [name, setName] = useState('');
  const [nisn, setNisn] = useState('');
  const [nis, setNis] = useState('');
  const [gender, setGender] = useState<'L' | 'P'>('L');
  const [classId, setClassId] = useState('cls_xi_mipa1');
  const [phone, setPhone] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cl = classes.find(c => c.id === classId);
    addNewStudent({
      name,
      nisn,
      nis,
      gender,
      class_id: classId,
      class_name: cl ? cl.name : 'XI MIPA 1',
      attendance_rate: 100,
      payment_status: 'Lunas',
      phone,
      parent_name: parentName,
      parent_phone: parentPhone,
      address,
      status: 'Aktif'
    });
    setShowAddModal(false);
    setName('');
    setNisn('');
    setNis('');
    setPhone('');
    setParentName('');
    setAddress('');
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.nisn.includes(search) ||
    s.class_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Header and Subnav */}
      <div className="p-6 rounded-[32px] bg-white/80 backdrop-blur-md border border-white/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
              Manajemen Data Induk Sekolah
            </h3>
            <p className="text-xs text-slate-500">
              Pengelolaan master data siswa terdaftar, dewan guru, rombongan belajar, dan kurikulum mata pelajaran
            </p>
          </div>

          {(role === 'admin' || role === 'kurikulum') && (
            <button
              onClick={() => setShowAddModal(true)}
              className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all"
            >
              <Plus className="w-4 h-4" />
              Tambah Siswa Baru
            </button>
          )}
        </div>

        {/* Sub Tabs */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveSubTab('siswa')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeSubTab === 'siswa'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            Data Siswa ({students.length})
          </button>

          <button
            onClick={() => setActiveSubTab('guru')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeSubTab === 'guru'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            Data Guru & Tenaga Pendidik ({teachers.length})
          </button>

          <button
            onClick={() => setActiveSubTab('kelas')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeSubTab === 'kelas'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            Rombongan Belajar ({classes.length})
          </button>

          <button
            onClick={() => setActiveSubTab('mapel')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeSubTab === 'mapel'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Mata Pelajaran ({subjects.length})
          </button>
        </div>
      </div>

      {/* Subtab Contents */}
      {activeSubTab === 'siswa' && (
        <div className="p-6 rounded-[32px] bg-white/80 backdrop-blur-md border border-white/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)]">
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Cari siswa, NISN, atau kelas..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
              />
            </div>
            <span className="text-xs text-slate-500 font-semibold">
              Menampilkan {filteredStudents.length} siswa aktif
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-3">Nama Siswa</th>
                  <th className="py-3 px-3">NISN / NIS</th>
                  <th className="py-3 px-3">Kelas</th>
                  <th className="py-3 px-3">Kehadiran</th>
                  <th className="py-3 px-3">Status SPP</th>
                  <th className="py-3 px-3">Orang Tua / Kontak</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filteredStudents.map(st => (
                  <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-3">
                      <p className="font-bold text-slate-900">{st.name}</p>
                      <p className="text-[11px] text-slate-400">{st.address}</p>
                    </td>
                    <td className="py-3.5 px-3 font-mono">
                      <p className="font-bold text-slate-800">{st.nisn}</p>
                      <p className="text-[11px] text-slate-400">NIS: {st.nis}</p>
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-slate-800">{st.class_name}</td>
                    <td className="py-3.5 px-3">
                      <span className="font-extrabold text-slate-900">{st.attendance_rate}%</span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          st.payment_status === 'Lunas'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-rose-100 text-rose-700'
                        }`}
                      >
                        {st.payment_status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <p className="font-semibold text-slate-800">{st.parent_name}</p>
                      <p className="text-[11px] text-slate-400">{st.parent_phone}</p>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {st.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeSubTab === 'guru' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {teachers.map(tch => (
            <div
              key={tch.id}
              className="p-5 rounded-[28px] bg-white/80 backdrop-blur-md border border-white/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)] flex items-start gap-3.5"
            >
              <img
                src={tch.avatar}
                alt={tch.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/20"
              />
              <div className="flex-1">
                <h4 className="text-xs font-bold text-slate-900 leading-snug">{tch.name}</h4>
                <p className="text-[10px] font-mono text-slate-400 mt-0.5">NIP: {tch.nip}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {tch.subjects.map(sb => (
                    <span key={sb} className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-semibold">
                      {sb}
                    </span>
                  ))}
                </div>
                {tch.is_homeroom && (
                  <p className="text-[11px] font-bold text-emerald-700 mt-2">
                    ★ Wali Kelas {tch.homeroom_class}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeSubTab === 'kelas' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {classes.map(cl => (
            <div
              key={cl.id}
              className="p-5 rounded-[28px] bg-white/80 backdrop-blur-md border border-white/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)]"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-lg font-black text-slate-900 font-['Outfit']">{cl.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 font-bold text-slate-600">
                  Tingkat {cl.grade_level}
                </span>
              </div>
              <div className="mt-3 space-y-1 text-xs text-slate-600">
                <p>Kurikulum: <strong className="text-slate-800">{cl.major}</strong></p>
                <p>Wali Kelas: <strong className="text-slate-800">{cl.homeroom_teacher_name}</strong></p>
                <p>Ruang: <span className="font-mono">{cl.room}</span></p>
                <p>Total Siswa: <strong className="text-blue-600">{cl.total_students} Peserta Didik</strong></p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeSubTab === 'mapel' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map(sb => (
            <div
              key={sb.id}
              className="p-5 rounded-[28px] bg-white/80 backdrop-blur-md border border-white/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)]"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h4 className="text-sm font-bold text-slate-900">{sb.name}</h4>
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  {sb.code}
                </span>
              </div>
              <div className="mt-3 space-y-1 text-xs text-slate-600">
                <p>Alokasi: <strong className="text-slate-900">{sb.weekly_hours} Jam Pelajaran / Pekan</strong></p>
                <p>Tingkat: Kelas {sb.grade_level}</p>
                <p>Pedoman: {sb.curriculum}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Add Student */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-slate-900 mb-4 font-['Outfit']">
              Tambah Siswa Baru ke Data Induk
            </h3>
            <form onSubmit={handleAddSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Lengkap Siswa</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">NISN (10 Digit)</label>
                  <input
                    type="text"
                    value={nisn}
                    onChange={e => setNisn(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">NIS Sekolah</label>
                  <input
                    type="text"
                    value={nis}
                    onChange={e => setNis(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Jenis Kelamin</label>
                  <select
                    value={gender}
                    onChange={e => setGender(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                  >
                    <option value="L">Laki-laki (L)</option>
                    <option value="P">Perempuan (P)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Rombel / Kelas</label>
                  <select
                    value={classId}
                    onChange={e => setClassId(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                  >
                    {classes.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nama Orang Tua / Wali</label>
                  <input
                    type="text"
                    value={parentName}
                    onChange={e => setParentName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">No. WhatsApp Orang Tua</label>
                  <input
                    type="text"
                    value={parentPhone}
                    onChange={e => setParentPhone(e.target.value)}
                    placeholder="081234567890"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Alamat Domisili</label>
                <textarea
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  rows={2}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                  required
                />
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
                  Simpan Siswa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
