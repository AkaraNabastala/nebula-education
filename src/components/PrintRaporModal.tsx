import React from 'react';
import { X, Printer, Award, FileText } from 'lucide-react';
import { Student } from '../types';
import { useApp } from '../context/AppContext';

interface PrintRaporModalProps {
  student: Student;
  onClose: () => void;
}

export const PrintRaporModal: React.FC<PrintRaporModalProps> = ({ student, onClose }) => {
  const { assessment } = useApp();

  const handlePrint = () => {
    window.print();
  };

  const studentScore = assessment.scores.find(s => s.student_id === student.id) || {
    tugas1: 85,
    tugas2: 88,
    uts: 84,
    uas: 89,
    final_score: 87,
    predicate: 'A',
    notes: 'Menunjukkan pemahaman materi yang sangat baik, santun, dan disiplin.'
  };

  const subjectsList = [
    { code: 'MTK-W', name: 'Matematika Wajib', kkm: 75, nilai: studentScore.final_score, predikat: studentScore.predicate, catatan: studentScore.notes },
    { code: 'FIS-11', name: 'Fisika Peminatan', kkm: 75, nilai: 86, predikat: 'B', catatan: 'Mampu menganalisis hukum termodinamika dan mekanika dengan baik.' },
    { code: 'KIM-11', name: 'Kimia Peminatan', kkm: 75, nilai: 89, predikat: 'A', catatan: 'Sangat terampil dalam praktikum stoikiometri dan larutan.' },
    { code: 'IND-11', name: 'Bahasa Indonesia', kkm: 75, nilai: 92, predikat: 'A', catatan: 'Kecakapan menulis teks argumentasi dan berbicara sangat baik.' },
    { code: 'ING-11', name: 'Bahasa Inggris', kkm: 75, nilai: 88, predikat: 'A', catatan: 'Active participation in reading comprehension and presentation.' },
    { code: 'INF-11', name: 'Informatika', kkm: 75, nilai: 91, predikat: 'A', catatan: 'Menguasai struktur algoritma pemrograman dan logika percabangan.' }
  ];

  const averageScore = Math.round(subjectsList.reduce((acc, curr) => acc + curr.nilai, 0) / subjectsList.length);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Action Bar (Hidden when printing) */}
        <div className="p-4 px-6 bg-slate-900 text-white flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-bold">Laporan Capaian Hasil Belajar (E-Rapor)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4" />
              Cetak / Simpan PDF
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Body */}
        <div className="p-8 overflow-y-auto print:p-0 text-slate-800 text-sm font-sans" id="printable-rapor">
          {/* Header Kop Surat */}
          <div className="text-center pb-4 border-b-2 border-slate-900 flex items-center justify-between">
            <div className="w-16 h-16 rounded-xl bg-blue-700 text-white font-bold text-2xl flex items-center justify-center font-['Outfit']">
              ED
            </div>
            <div className="flex-1 px-4 text-center">
              <h2 className="text-base font-black uppercase tracking-wider text-slate-900">
                PEMERINTAH PROVINSI DAERAH KHUSUS JAKARTA
              </h2>
              <h1 className="text-lg font-black uppercase tracking-wider text-slate-900">
                SMA NEGERI 1 EDUTERA NUSANTARA
              </h1>
              <p className="text-xs text-slate-600 font-medium">
                LAPORAN HASIL PENILAIAN SUMATIF SEMESTER GANJIL TP 2026/2027
              </p>
              <p className="text-[11px] text-slate-500">
                Jl. Pendidikan Nasional No. 45, Jakarta Selatan • NPSN: 20108921 • Akreditasi A
              </p>
            </div>
          </div>

          {/* Student Identitas */}
          <div className="grid grid-cols-2 gap-4 my-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div className="space-y-1">
              <p><strong className="text-slate-500 font-medium">Nama Peserta Didik:</strong> <span className="font-bold text-slate-900">{student.name}</span></p>
              <p><strong className="text-slate-500 font-medium">Nomor Induk / NISN:</strong> {student.nis} / {student.nisn}</p>
              <p><strong className="text-slate-500 font-medium">Kelas / Fase:</strong> {student.class_name} (Fase F - Kurikulum Merdeka)</p>
            </div>
            <div className="space-y-1 text-right">
              <p><strong className="text-slate-500 font-medium">Tahun Ajaran:</strong> 2026/2027</p>
              <p><strong className="text-slate-500 font-medium">Semester:</strong> 1 (Ganjil)</p>
              <p><strong className="text-slate-500 font-medium">Wali Kelas:</strong> Hendra Wijaya, S.Pd., M.Si.</p>
            </div>
          </div>

          {/* Subjects and Scores Table */}
          <table className="w-full border-collapse mb-5">
            <thead>
              <tr className="border-y border-slate-400 bg-slate-100 text-xs font-bold text-slate-800">
                <th className="py-2 px-2 text-center w-10">No</th>
                <th className="py-2 px-3 text-left">Mata Pelajaran</th>
                <th className="py-2 px-2 text-center w-14">KKM</th>
                <th className="py-2 px-2 text-center w-16">Nilai Akhir</th>
                <th className="py-2 px-2 text-center w-14">Predikat</th>
                <th className="py-2 px-3 text-left">Capaian Kompetensi / Catatan Guru</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              {subjectsList.map((sbj, idx) => (
                <tr key={sbj.code} className="hover:bg-slate-50">
                  <td className="py-2 px-2 text-center">{idx + 1}</td>
                  <td className="py-2 px-3 font-semibold text-slate-900">{sbj.name}</td>
                  <td className="py-2 px-2 text-center font-mono">{sbj.kkm}</td>
                  <td className="py-2 px-2 text-center font-bold text-slate-900 font-mono">{sbj.nilai}</td>
                  <td className="py-2 px-2 text-center font-bold text-blue-700">{sbj.predikat}</td>
                  <td className="py-2 px-3 text-slate-600 text-[11px] leading-relaxed">{sbj.catatan}</td>
                </tr>
              ))}
              <tr className="bg-slate-100 font-bold border-t border-slate-300">
                <td colSpan={3} className="py-2 px-3 text-right">Rata-Rata Nilai Akademik:</td>
                <td className="py-2 px-2 text-center font-mono text-blue-900 text-sm font-extrabold">{averageScore}</td>
                <td className="py-2 px-2 text-center text-blue-900">A</td>
                <td className="py-2 px-3 text-slate-700 text-[11px]">Memenuhi seluruh kriteria ketuntasan minimal dengan predikat sangat memuaskan.</td>
              </tr>
            </tbody>
          </table>

          {/* Attendance Recap */}
          <div className="mb-5 p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs">
            <span className="font-bold text-slate-800 block mb-1">Rekapitulasi Kehadiran Semester Ini:</span>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-1.5 bg-white rounded border"><span className="text-slate-400 block text-[10px]">Hadir</span><strong className="text-slate-900 text-sm">{student.attendance_rate}%</strong></div>
              <div className="p-1.5 bg-white rounded border"><span className="text-slate-400 block text-[10px]">Sakit (S)</span><strong className="text-slate-900 text-sm">1 Hari</strong></div>
              <div className="p-1.5 bg-white rounded border"><span className="text-slate-400 block text-[10px]">Izin (I)</span><strong className="text-slate-900 text-sm">2 Hari</strong></div>
              <div className="p-1.5 bg-white rounded border"><span className="text-slate-400 block text-[10px]">Tanpa Keterangan (A)</span><strong className="text-slate-900 text-sm">0 Hari</strong></div>
            </div>
          </div>

          {/* Wali Kelas Note */}
          <div className="mb-6 p-3 rounded-xl border border-slate-200 bg-white text-xs">
            <span className="font-bold text-slate-800 block mb-0.5">Catatan Wali Kelas:</span>
            <p className="text-slate-600 italic">
              "Pertahankan prestasi belajar dan kepemimpinan yang baik di kelas. Tingkatkan terus keikutsertaan dalam kompetisi sains dan pembinaan olimpiade tingkat nasional."
            </p>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 text-center text-xs">
            <div>
              <p className="text-slate-500">Mengetahui,</p>
              <p className="font-semibold text-slate-700">Orang Tua / Wali Murid</p>
              <div className="h-14"></div>
              <p className="font-bold text-slate-900 underline">({student.parent_name})</p>
            </div>
            <div>
              <p className="text-slate-500">Jakarta, 22 Oktober 2026</p>
              <p className="font-semibold text-slate-700">Wali Kelas XI MIPA 1</p>
              <div className="h-14"></div>
              <p className="font-bold text-slate-900 underline">Hendra Wijaya, S.Pd., M.Si.</p>
              <p className="text-[10px] text-slate-500">NIP. 19791120 200501 1 008</p>
            </div>
            <div>
              <p className="text-slate-500">Mengetahui,</p>
              <p className="font-semibold text-slate-700">Kepala Sekolah</p>
              <div className="h-14"></div>
              <p className="font-bold text-slate-900 underline">Bambang Kusuma, M.M.</p>
              <p className="text-[10px] text-slate-500">NIP. 19750812 199903 1 002</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
