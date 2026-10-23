import React, { useState } from 'react';
import {
  ShieldCheck,
  UserCheck,
  Plus,
  Trash2,
  Calendar,
  Layers,
  CheckCircle2,
  AlertCircle,
  Building2,
  Clock,
  Compass,
  KeyRound,
  FileCode2,
  Database,
  ArrowRightLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { JabatanType, UserCategory, UserAssignment } from '../types';

export const ManajemenPenugasanModule: React.FC = () => {
  const {
    assignments,
    assignJabatan,
    revokeJabatan,
    toggleAssignmentStatus,
    classes,
    extracurriculars,
    teachers,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'daftar' | 'matriks' | 'erd'>('daftar');
  const [showAssignModal, setShowAssignModal] = useState(false);

  // Form states for new assignment
  const [formTeacherId, setFormTeacherId] = useState(teachers[0]?.id || 'tch_01');
  const [formJabatan, setFormJabatan] = useState<JabatanType>('wali_kelas');
  const [formScopeType, setFormScopeType] = useState<'kelas' | 'ekskul' | 'institusi' | 'sesi'>('kelas');
  const [formScopeId, setFormScopeId] = useState('cls_xi_mipa1');
  const [formStartDate, setFormStartDate] = useState('2026-07-15');
  const [formEndDate, setFormEndDate] = useState('2027-06-30');

  const jabatanLabels: Record<JabatanType, { title: string; desc: string; defaultScope: string }> = {
    wali_kelas: {
      title: 'Wali Kelas',
      desc: 'Membina rombel tertentu, memantau kehadiran, memproses perizinan siswa, dan finalisasi rapor',
      defaultScope: 'kelas'
    },
    admin_kurikulum: {
      title: 'Admin Kurikulum',
      desc: 'Pengaturan jadwal pelajaran, alokasi jam mengajar, kalender akademik, dan monitoring KBM',
      defaultScope: 'institusi'
    },
    bendahara: {
      title: 'Bendahara / Admin Keuangan',
      desc: 'Penerbitan tagihan SPP, pencatatan kasir tunai, rekonsiliasi Midtrans, dan laporan keuangan',
      defaultScope: 'institusi'
    },
    pembina_ekskul: {
      title: 'Pembina Ekstrakurikuler',
      desc: 'Membina anggota kegiatan ekstrakurikuler, presensi latihan, dan pelaporan kegiatan',
      defaultScope: 'ekskul'
    },
    guru_piket: {
      title: 'Guru Piket / Pengganti',
      desc: 'Penugasan sementara memantau ketertiban harian atau menggantikan sesi pembelajaran guru berhalangan',
      defaultScope: 'sesi'
    },
    admin_kesiswaan: {
      title: 'Admin Kesiswaan (Opsional)',
      desc: 'Tata tertib siswa, catatan pembinaan kepribadian, dan kegiatan organisasi OSIS',
      defaultScope: 'institusi'
    }
  };

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    const tch = teachers.find(t => t.id === formTeacherId) || teachers[0];

    let scopeName = 'Seluruh Sekolah';
    if (formScopeType === 'kelas') {
      const cl = classes.find(c => c.id === formScopeId);
      scopeName = cl ? cl.name : 'Kelas Terpilih';
    } else if (formScopeType === 'ekskul') {
      const ek = extracurriculars.find(e => e.id === formScopeId);
      scopeName = ek ? ek.name : 'Ekskul Terpilih';
    } else if (formScopeType === 'sesi') {
      scopeName = 'Sesi Jam Pelajaran Terjadwal';
    }

    let permissions: string[] = [];
    if (formJabatan === 'wali_kelas') {
      permissions = ['leave_requests.review', 'students.read', 'attendance.read', 'grades.read_class', 'report_cards.finalize'];
    } else if (formJabatan === 'admin_kurikulum') {
      permissions = ['schedule.manage', 'curriculum.manage', 'journals.audit', 'grades.manage', 'promotions.manage'];
    } else if (formJabatan === 'bendahara') {
      permissions = ['finance.invoices.manage', 'finance.payments.record', 'finance.midtrans.monitor', 'finance.reports.read'];
    } else if (formJabatan === 'pembina_ekskul') {
      permissions = ['extracurricular.attendance.manage', 'extracurricular.members.manage'];
    } else if (formJabatan === 'guru_piket') {
      permissions = ['attendance.manage', 'substitute_teacher.assign'];
    } else {
      permissions = ['students.conduct.manage', 'student_activities.manage'];
    }

    assignJabatan({
      user_id: tch.id,
      user_name: tch.name,
      jabatan: formJabatan,
      jabatan_title: `${jabatanLabels[formJabatan].title} (${scopeName})`,
      scope_type: formScopeType,
      scope_id: formScopeId,
      scope_name: scopeName,
      start_date: formStartDate,
      end_date: formEndDate,
      is_active: true,
      assigned_by: 'Bambang Kusuma, M.M. (Admin Aplikasi)',
      permissions
    });

    setShowAssignModal(false);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Top Banner */}
      <div className="p-6 rounded-[32px] bg-white/80 backdrop-blur-md border border-white/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-700">
              <KeyRound className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
              Manajemen Akun, Jabatan & Penugasan (RBAC)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Pemisahan arsitektur antara akun pengguna, kategori dasar (Guru/Siswa/Staf), dan penugasan tanggung jawab dengan cakupan (scope)
          </p>
        </div>

        <button
          onClick={() => setShowAssignModal(true)}
          className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all"
        >
          <Plus className="w-4 h-4" />
          Berikan Penugasan Jabatan
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('daftar')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'daftar'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white/80 text-slate-600 hover:bg-white border border-slate-200'
          }`}
        >
          Penugasan Aktif ({assignments.length})
        </button>
        <button
          onClick={() => setActiveTab('matriks')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'matriks'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white/80 text-slate-600 hover:bg-white border border-slate-200'
          }`}
        >
          Matriks Hak Akses & Permission
        </button>
        <button
          onClick={() => setActiveTab('erd')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'erd'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white/80 text-slate-600 hover:bg-white border border-slate-200'
          }`}
        >
          Skema Database Prisma & ERD
        </button>
      </div>

      {/* Tab 1: Daftar Penugasan Aktif */}
      {activeTab === 'daftar' && (
        <div className="p-6 rounded-[32px] bg-white/80 backdrop-blur-md border border-white/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)]">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Daftar Penugasan Jabatan yang Berlaku
              </h4>
              <p className="text-xs text-slate-500">
                Satu akun dapat merangkap beberapa tugas aktif tanpa duplikasi akun login
              </p>
            </div>
            <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              {assignments.filter(a => a.is_active).length} Jabatan Berstatus Aktif
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-3">Nama Pengguna & Akun</th>
                  <th className="py-3 px-3">Jabatan / Tanggung Jawab</th>
                  <th className="py-3 px-3">Cakupan Lingkup (Scope)</th>
                  <th className="py-3 px-3">Masa Berlaku</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {assignments.map(asg => (
                  <tr key={asg.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-3">
                      <p className="font-bold text-slate-900">{asg.user_name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">Diberikan oleh: {asg.assigned_by}</p>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="font-extrabold text-blue-700 block">
                        {asg.jabatan_title}
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {asg.permissions.slice(0, 2).map((perm, idx) => (
                          <span key={idx} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                            {perm}
                          </span>
                        ))}
                        {asg.permissions.length > 2 && (
                          <span className="text-[9px] font-mono text-slate-400">
                            +{asg.permissions.length - 2} lagi
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold text-[11px] capitalize">
                        {asg.scope_type}: {asg.scope_name}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-mono text-[11px] text-slate-600">
                      {asg.start_date} s/d {asg.end_date || 'Tak Berbatas'}
                    </td>
                    <td className="py-3.5 px-3">
                      <button
                        onClick={() => toggleAssignmentStatus(asg.id)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
                          asg.is_active
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                      >
                        {asg.is_active ? '● Aktif' : '○ Nonaktif'}
                      </button>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={() => revokeJabatan(asg.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Cabut Penugasan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Matriks Hak Akses (Section 8) */}
      {activeTab === 'matriks' && (
        <div className="p-6 rounded-[32px] bg-white/80 backdrop-blur-md border border-white/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)] space-y-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Matriks Kategori Akun Dasar, Jabatan, dan Hak Akses (Permissions)
            </h4>
            <p className="text-xs text-slate-500">
              Prinsip Least-Privilege: Hak akses dibatasi ketat berdasarkan cakupan penugasan yang masih berlaku
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase text-slate-600">
                  <th className="py-3 px-3">Jabatan / Tanggung Jawab</th>
                  <th className="py-3 px-3">Kategori Akun Penerima</th>
                  <th className="py-3 px-3">Cakupan Akses (Scope)</th>
                  <th className="py-3 px-3">Hak Akses Utama (Permissions)</th>
                  <th className="py-3 px-3">Status Penggunaan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-3.5 px-3 font-bold text-slate-900">Admin Aplikasi</td>
                  <td className="py-3.5 px-3"><span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">Admin Aplikasi</span></td>
                  <td className="py-3.5 px-3 font-mono">Institusi Penuh</td>
                  <td className="py-3.5 px-3 font-mono text-[11px]">users.manage, assignments.manage, system.config</td>
                  <td className="py-3.5 px-3"><span className="text-emerald-700 font-bold">Wajib</span></td>
                </tr>
                <tr>
                  <td className="py-3.5 px-3 font-bold text-slate-900">Admin Kurikulum</td>
                  <td className="py-3.5 px-3"><span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">Guru / Staf</span></td>
                  <td className="py-3.5 px-3 font-mono">KBM & Kurikulum</td>
                  <td className="py-3.5 px-3 font-mono text-[11px]">schedule.manage, journals.audit, grades.manage</td>
                  <td className="py-3.5 px-3"><span className="text-emerald-700 font-bold">Wajib</span></td>
                </tr>
                <tr>
                  <td className="py-3.5 px-3 font-bold text-slate-900">Bendahara / Admin Keuangan</td>
                  <td className="py-3.5 px-3"><span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-bold">Staf / Guru</span></td>
                  <td className="py-3.5 px-3 font-mono">Keuangan & SPP</td>
                  <td className="py-3.5 px-3 font-mono text-[11px]">finance.invoices.manage, finance.payments.record, midtrans.read</td>
                  <td className="py-3.5 px-3"><span className="text-emerald-700 font-bold">Wajib</span></td>
                </tr>
                <tr>
                  <td className="py-3.5 px-3 font-bold text-slate-900">Wali Kelas</td>
                  <td className="py-3.5 px-3"><span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">Guru</span></td>
                  <td className="py-3.5 px-3 font-mono">Kelas Tertentu (e.g. XI MIPA 1)</td>
                  <td className="py-3.5 px-3 font-mono text-[11px]">leave_requests.review, students.read, report_cards.finalize</td>
                  <td className="py-3.5 px-3"><span className="text-emerald-700 font-bold">Wajib</span></td>
                </tr>
                <tr>
                  <td className="py-3.5 px-3 font-bold text-slate-900">Pembina Ekstrakurikuler</td>
                  <td className="py-3.5 px-3"><span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">Guru / Staf</span></td>
                  <td className="py-3.5 px-3 font-mono">Ekskul Tertentu (e.g. Robotik)</td>
                  <td className="py-3.5 px-3 font-mono text-[11px]">extracurricular.attendance.manage, members.read</td>
                  <td className="py-3.5 px-3"><span className="text-slate-500 font-bold">Opsional</span></td>
                </tr>
                <tr>
                  <td className="py-3.5 px-3 font-bold text-slate-900">Guru Piket / Pengganti</td>
                  <td className="py-3.5 px-3"><span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">Guru</span></td>
                  <td className="py-3.5 px-3 font-mono">Sesi Pembelajaran Terkait</td>
                  <td className="py-3.5 px-3 font-mono text-[11px]">attendance.manage, substitute.exec</td>
                  <td className="py-3.5 px-3"><span className="text-slate-500 font-bold">Opsional</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Skema ERD Prisma (Section 8) */}
      {activeTab === 'erd' && (
        <div className="p-6 rounded-[32px] bg-white/80 backdrop-blur-md border border-white/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)] space-y-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Desain Skema Relasional Prisma ORM (PostgreSQL)
            </h4>
            <p className="text-xs text-slate-500">
              Pemodelan database entitas akun, profil, penugasan berskala (scoped assignments), dan riwayat audit
            </p>
          </div>

          <pre className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800">
{`// Prisma Schema Model - Sistem Akun, Jabatan & Penugasan
enum UserCategory {
  ADMIN_APLIKASI
  GURU
  SISWA
  STAF
}

enum JabatanType {
  ADMIN_KURIKULUM
  BENDAHARA
  WALI_KELAS
  PEMBINA_EKSKUL
  GURU_PIKET
  ADMIN_KESISWAAN
}

model User {
  id              String         @id @default(uuid())
  email           String         @unique
  passwordHash    String
  fullName        String
  category        UserCategory
  isActive        Boolean        @default(true)
  assignments     Assignment[]   @relation("UserAssignments")
  createdAssgns   Assignment[]   @relation("AssignedByAdmin")
  auditLogs       AuditLog[]
  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt
}

model Assignment {
  id              String         @id @default(uuid())
  userId          String
  user            User           @relation("UserAssignments", fields: [userId], references: [id])
  jabatan         JabatanType
  title           String
  scopeType       String         // "kelas", "ekskul", "institusi", "sesi"
  scopeId         String?
  startDate       DateTime
  endDate         DateTime?
  isActive        Boolean        @default(true)
  assignedById    String
  assignedBy      User           @relation("AssignedByAdmin", fields: [assignedById], references: [id])
  permissions     String[]       // e.g. ["leave_requests.review", "students.read"]
  createdAt       DateTime       @default(now())

  @@index([userId, isActive])
  @@index([scopeType, scopeId])
}`}
          </pre>
        </div>
      )}

      {/* Modal Berikan Penugasan Baru */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 w-full max-w-lg">
            <h3 className="text-base font-bold text-slate-900 mb-4 font-['Outfit']">
              Formulir Pemberian Penugasan / Jabatan
            </h3>
            <form onSubmit={handleCreateAssignment} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Pilih Akun Guru / Staf</label>
                <select
                  value={formTeacherId}
                  onChange={e => setFormTeacherId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
                >
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.name} (NIP: {t.nip})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Jabatan / Tanggung Jawab</label>
                <select
                  value={formJabatan}
                  onChange={e => {
                    const j = e.target.value as JabatanType;
                    setFormJabatan(j);
                    setFormScopeType(jabatanLabels[j].defaultScope as any);
                  }}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-blue-900"
                >
                  <option value="wali_kelas">Wali Kelas (Membina Rombel & Izin Siswa)</option>
                  <option value="admin_kurikulum">Admin Kurikulum (Jadwal & KBM)</option>
                  <option value="bendahara">Bendahara / Admin Keuangan (SPP & Midtrans)</option>
                  <option value="pembina_ekskul">Pembina Ekstrakurikuler</option>
                  <option value="guru_piket">Guru Piket / Guru Pengganti</option>
                  <option value="admin_kesiswaan">Admin Kesiswaan (Opsional)</option>
                </select>
                <p className="text-[11px] text-slate-500 mt-1 italic">
                  {jabatanLabels[formJabatan]?.desc}
                </p>
              </div>

              {formJabatan === 'wali_kelas' && (
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Pilih Kelas Binaan</label>
                  <select
                    value={formScopeId}
                    onChange={e => setFormScopeId(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
                  >
                    {classes.map(c => (
                      <option key={c.id} value={c.id}>{c.name} ({c.major})</option>
                    ))}
                  </select>
                </div>
              )}

              {formJabatan === 'pembina_ekskul' && (
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Pilih Ekstrakurikuler</label>
                  <select
                    value={formScopeId}
                    onChange={e => setFormScopeId(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
                  >
                    {extracurriculars.map(e => (
                      <option key={e.id} value={e.id}>{e.name} ({e.category})</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tanggal Mulai</label>
                  <input
                    type="date"
                    value={formStartDate}
                    onChange={e => setFormStartDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tanggal Selesai (Opsional)</label>
                  <input
                    type="date"
                    value={formEndDate}
                    onChange={e => setFormEndDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-500/25"
                >
                  Sahkan Penugasan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
