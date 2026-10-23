/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardOverview } from './components/DashboardOverview';
import { DataIndukModule } from './components/DataIndukModule';
import { PresensiModule } from './components/PresensiModule';
import { JurnalGuruModule } from './components/JurnalGuruModule';
import { PenilaianModule } from './components/PenilaianModule';
import { KeuanganModule } from './components/KeuanganModule';
import { PerizinanModule } from './components/PerizinanModule';
import { JadwalModule } from './components/JadwalModule';
import { EkstrakurikulerModule } from './components/EkstrakurikulerModule';
import { KenaikanKelasModule } from './components/KenaikanKelasModule';
import { LaporanModule } from './components/LaporanModule';
import { AuditLogModule } from './components/AuditLogModule';
import { ManajemenPenugasanModule } from './components/ManajemenPenugasanModule';
import { MidtransModal } from './components/MidtransModal';
import { PrintReceiptModal } from './components/PrintReceiptModal';
import { PrintRaporModal } from './components/PrintRaporModal';
import { Toast } from './components/Toast';
import { FileCode2, BookOpen, Layers, ShieldCheck, Database, Check } from 'lucide-react';

const MainLayout: React.FC = () => {
  const {
    activeTab,
    themeMode,
    isSidebarExpanded,
    activeMidtransInvoice,
    setActiveMidtransInvoice,
    activeReceiptInvoice,
    setActiveReceiptInvoice,
    activeRaporStudent,
    setActiveRaporStudent
  } = useApp();

  const [showArchDocs, setShowArchDocs] = useState(false);

  const isCrowz = themeMode === 'crowz';

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-300 font-['Plus_Jakarta_Sans',sans-serif] ${
        isCrowz ? 'bg-[#f6c4ad]' : 'bg-[#dce7f2]'
      }`}
    >
      {/* 1. FIXED TOP NAVBAR */}
      <Header />

      {/* 2. FIXED LEFT SIDEBAR */}
      <Sidebar />

      {/* 3. MAIN CONTENT AREA (Scrolls smoothly under fixed header and alongside fixed sidebar) */}
      <main
        className={`transition-all duration-300 pt-20 px-3 sm:px-6 lg:px-8 pb-24 md:pb-10 min-h-screen ${
          isSidebarExpanded ? 'md:ml-64 lg:ml-68' : 'md:ml-20'
        }`}
      >
        <div className="max-w-[1600px] mx-auto flex flex-col gap-5">
          {/* Dynamic Module Content */}
          <div className="flex-1">
            {activeTab === 'overview' && <DashboardOverview />}
            {activeTab === 'penugasan' && <ManajemenPenugasanModule />}
            {activeTab === 'datainduk' && <DataIndukModule />}
            {activeTab === 'presensi' && <PresensiModule />}
            {activeTab === 'jurnal' && <JurnalGuruModule />}
            {activeTab === 'penilaian' && <PenilaianModule />}
            {activeTab === 'keuangan' && <KeuanganModule />}
            {activeTab === 'perizinan' && <PerizinanModule />}
            {activeTab === 'jadwal' && <JadwalModule />}
            {activeTab === 'ekskul' && <EkstrakurikulerModule />}
            {activeTab === 'kenaikankelas' && <KenaikanKelasModule />}
            {activeTab === 'laporan' && <LaporanModule />}
            {activeTab === 'auditlog' && <AuditLogModule />}
          </div>

          {/* Footer Bar with Stage 1 Documentation Drawer trigger */}
          <footer className="mt-8 pt-4 border-t border-slate-300/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Edutera SIM Sekolah v2.5 • Sistem Akun & Penugasan Berlingkup (RBAC)</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowArchDocs(!showArchDocs)}
                className="px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-slate-700 font-semibold border border-slate-200 text-[11px] flex items-center gap-1.5 transition-all shadow-sm"
              >
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                Dokumen Arsitektur & Analisis
              </button>
              <span className="font-medium text-slate-600">SMA Negeri 1 Edutera Nusantara</span>
            </div>
          </footer>
        </div>
      </main>


      {/* Modals */}
      {activeMidtransInvoice && (
        <MidtransModal
          invoice={activeMidtransInvoice}
          onClose={() => setActiveMidtransInvoice(null)}
        />
      )}

      {activeReceiptInvoice && (
        <PrintReceiptModal
          invoice={activeReceiptInvoice}
          onClose={() => setActiveReceiptInvoice(null)}
        />
      )}

      {activeRaporStudent && (
        <PrintRaporModal
          student={activeRaporStudent}
          onClose={() => setActiveRaporStudent(null)}
        />
      )}

      {/* Stage 1 Architecture & Specifications Modal */}
      {showArchDocs && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 w-full max-w-3xl max-h-[85vh] overflow-y-auto text-xs text-slate-700 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-['Outfit']">
                    Tahap 1 — Analisis, Arsitektur & Spesifikasi Sistem
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Dokumentasi Lengkap SIM Sekolah Terintegrasi (SMP/MTs, SMA/MA, SMK)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowArchDocs(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                1. Daftar Role, Wewenang & Batas Akses (RBAC)
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li><strong>Admin Sekolah:</strong> Pengelolaan data induk, identitas sekolah, rombel, akun guru & siswa.</li>
                <li><strong>Guru Mapel:</strong> Presensi tatap muka per sesi, jurnal KBM, input asesmen tugas/ulangan/UTS/UAS.</li>
                <li><strong>Wali Kelas:</strong> Monitoring presensi rekapitulasi, catatan perkembangan siswa, verifikasi izin sakit/keperluan.</li>
                <li><strong>Admin Keuangan:</strong> Manajemen tarif SPP, penerbitan invoice massal, pencatatan kasir tunai, integrasi Midtrans.</li>
                <li><strong>Siswa / Orang Tua:</strong> Cek jadwal belajar, status presensi, pembayaran online via QRIS & Virtual Account, unduh e-rapor.</li>
                <li><strong>Admin Kurikulum:</strong> Alokasi jadwal mingguan bebas bentrok, monitoring kelengkapan jurnal guru.</li>
              </ul>

              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5 pt-2">
                <Layers className="w-4 h-4 text-blue-600" />
                2. Alur Bisnis Terintegrasi
              </h4>
              <p className="text-slate-600">
                Setiap pembayaran yang berhasil diselesaikan via Midtrans Snap (QRIS / BCA VA) memicu callback webhook yang memperbarui status tagihan menjadi <em>Paid (Lunas)</em> dan otomatis mengizinkan penerbitan kuitansi ber-QR resmi. Presensi sesi guru mengunci data kehadiran dan merekap persentase absensi siswa secara real-time.
              </p>

              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5 pt-2">
                <FileCode2 className="w-4 h-4 text-indigo-600" />
                3. Desain UI/UX Neumorphic & Responsif
              </h4>
              <p className="text-slate-600">
                Sistem mengadopsi palet warna & layout referensi: latar soft ice-blue (`#dce7f2`), curved vertical pill dock navy (`#0b1021`), highlight card royal electric blue (`#2563eb`), dark slate card, dan tablet/mobile adaptive floating dock.
              </p>
            </div>

            <div className="pt-3 border-t flex justify-end">
              <button
                onClick={() => setShowArchDocs(false)}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold"
              >
                Tutup Dokumen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Feedback */}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
