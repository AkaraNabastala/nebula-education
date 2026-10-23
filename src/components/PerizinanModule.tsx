import React, { useState } from 'react';
import {
  MessageSquare,
  Plus,
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  Calendar,
  AlertCircle,
  Paperclip,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PerizinanModule: React.FC = () => {
  const { leaves, approveLeave, rejectLeave, submitLeave, currentUser, role, students } = useApp();

  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [rejectModalId, setRejectModalId] = useState<string | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');

  // Form state
  const [formType, setFormType] = useState<'Sakit' | 'Izin'>('Sakit');
  const [formStartDate, setFormStartDate] = useState('2026-10-23');
  const [formEndDate, setFormEndDate] = useState('2026-10-24');
  const [formReason, setFormReason] = useState('');
  const [formAttachment, setFormAttachment] = useState('Surat_Keterangan_Dokter.pdf');
  const [formStudentId, setFormStudentId] = useState(students[0]?.id || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const st = role === 'siswa' ? currentUser : students.find(s => s.id === formStudentId) || students[0];
    submitLeave({
      student_id: st.id,
      student_name: st.name,
      class_name: st.class_name || 'XI MIPA 1',
      type: formType,
      start_date: formStartDate,
      end_date: formEndDate,
      reason: formReason,
      attachment_name: formAttachment
    });
    setShowSubmitModal(false);
    setFormReason('');
  };

  const handleApprove = (id: string) => {
    approveLeave(id, 'Izin telah diverifikasi oleh Wali Kelas.');
  };

  const handleRejectConfirm = () => {
    if (rejectModalId) {
      rejectLeave(rejectModalId, reviewNotes || 'Dokumen pendukung belum lengkap.');
      setRejectModalId(null);
      setReviewNotes('');
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Header */}
      <div className="p-6 rounded-[32px] bg-white/80 backdrop-blur-md border border-white/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
            Pengajuan & Verifikasi Perizinan Ketidakhadiran Siswa
          </h3>
          <p className="text-xs text-slate-500">
            Alur verifikasi surat izin sakit & izin resmi wali kelas langsung terhubung ke presensi harian
          </p>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all"
        >
          <Plus className="w-4 h-4" />
          Ajukan Izin Baru
        </button>
      </div>

      {/* Leaves Card List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {leaves.map(lev => {
          const isPending = lev.status === 'Menunggu Verifikasi';
          const isApproved = lev.status === 'Disetujui';
          const isRejected = lev.status === 'Ditolak';

          return (
            <div
              key={lev.id}
              className="p-5 rounded-[28px] bg-white/80 backdrop-blur-md border border-white/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)] hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                          lev.type === 'Sakit'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {lev.type}
                      </span>
                      <span className="text-xs font-bold text-slate-900">
                        {lev.student_name}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Kelas: <strong className="text-slate-700">{lev.class_name}</strong>
                    </p>
                  </div>

                  <div>
                    {isPending && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        <Clock className="w-3 h-3" />
                        Menunggu Verifikasi
                      </span>
                    )}
                    {isApproved && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        Disetujui
                      </span>
                    )}
                    {isRejected && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                        <XCircle className="w-3 h-3" />
                        Ditolak
                      </span>
                    )}
                  </div>
                </div>

                <div className="py-3 space-y-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2 text-slate-600 font-mono text-[11px]">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Periode: {lev.start_date} s/d {lev.end_date}</span>
                  </div>

                  <p className="text-slate-800 font-medium bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    "{lev.reason}"
                  </p>

                  {lev.attachment_name && (
                    <div className="flex items-center gap-2 text-[11px] text-blue-600 bg-blue-50/50 p-2 rounded-xl">
                      <Paperclip className="w-3.5 h-3.5" />
                      <span className="font-semibold underline cursor-pointer">
                        {lev.attachment_name}
                      </span>
                    </div>
                  )}

                  {lev.review_notes && (
                    <div className="mt-2 text-[11px] text-slate-500 border-l-2 border-slate-300 pl-2.5 italic">
                      Catatan Verifikasi: {lev.review_notes} ({lev.reviewed_by})
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons for Wali Kelas / Admin */}
              {isPending && (role === 'wali_kelas' || role === 'admin') && (
                <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => handleApprove(lev.id)}
                    className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Setujui Izin
                  </button>
                  <button
                    onClick={() => setRejectModalId(lev.id)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 text-xs font-bold transition-colors"
                  >
                    Tolak
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal Submit Leave */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 w-full max-w-md">
            <h3 className="text-base font-bold text-slate-900 mb-4 font-['Outfit']">
              Formulir Permohonan Izin Siswa
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              {role !== 'siswa' && (
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Pilih Siswa</label>
                  <select
                    value={formStudentId}
                    onChange={e => setFormStudentId(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                  >
                    {students.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.class_name})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="font-bold text-slate-700 block mb-1">Jenis Izin</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormType('Sakit')}
                    className={`py-2 rounded-xl font-bold transition-all ${
                      formType === 'Sakit'
                        ? 'bg-amber-500 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Sakit (Surat Dokter)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormType('Izin')}
                    className={`py-2 rounded-xl font-bold transition-all ${
                      formType === 'Izin'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Izin Khusus / Keperluan
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tanggal Mulai</label>
                  <input
                    type="date"
                    value={formStartDate}
                    onChange={e => setFormStartDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tanggal Selesai</label>
                  <input
                    type="date"
                    value={formEndDate}
                    onChange={e => setFormEndDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Alasan Ketidakhadiran</label>
                <textarea
                  value={formReason}
                  onChange={e => setFormReason(e.target.value)}
                  rows={3}
                  placeholder="Jelaskan alasan izin / sakit secara rinci..."
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Lampiran Bukti (PDF / Foto)</label>
                <input
                  type="text"
                  value={formAttachment}
                  onChange={e => setFormAttachment(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-mono text-[11px]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-500/25"
                >
                  Kirim Permohonan Izin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Reject */}
      {rejectModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 w-full max-w-sm">
            <h3 className="text-base font-bold text-slate-900 mb-2">Tolak Permohonan Izin</h3>
            <p className="text-xs text-slate-500 mb-3">
              Masukkan alasan penolakan izin yang akan disampaikan kepada siswa / wali murid:
            </p>
            <textarea
              value={reviewNotes}
              onChange={e => setReviewNotes(e.target.value)}
              rows={3}
              placeholder="Contoh: Surat keterangan dokter belum dilampirkan..."
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs mb-4"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setRejectModalId(null)}
                className="px-4 py-2 rounded-xl text-xs text-slate-600 hover:bg-slate-100"
              >
                Batal
              </button>
              <button
                onClick={handleRejectConfirm}
                className="px-4 py-2 rounded-xl text-xs bg-rose-600 hover:bg-rose-700 text-white font-bold"
              >
                Konfirmasi Tolak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
