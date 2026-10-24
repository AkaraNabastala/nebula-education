import React, { useState } from 'react';
import {
  Search,
  Bell,
  ChevronDown,
  UserCheck,
  Shield,
  Palette,
  Check,
  Menu,
  X,
  Zap,
  KeyRound,
  ExternalLink,
  SlidersHorizontal
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Role } from '../types';

export const Header: React.FC = () => {
  const {
    role,
    setRole,
    currentUser,
    activeTab,
    setActiveTab,
    themeMode,
    setThemeMode,
    searchTerm,
    setSearchTerm,
    leaves,
    invoices,
    assignments,
    isSidebarExpanded,
    setIsSidebarExpanded,
    isMobileMenuOpen,
    setIsMobileMenuOpen
  } = useApp();

  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  const isCrowz = themeMode === 'crowz';

  const pendingLeaves = leaves.filter(l => l.status === 'Menunggu Verifikasi');
  const unpaidInvoices = invoices.filter(i => i.status === 'overdue' || i.status === 'upcoming');

  const tabTitleMap: Record<string, string> = {
    overview: 'Dashboard Ringkasan',
    penugasan: 'Manajemen Akun & Penugasan Jabatan',
    datainduk: 'Data Induk & Master',
    presensi: 'Presensi Pembelajaran KBM',
    jurnal: 'Jurnal Mengajar Guru',
    penilaian: 'Nilai Asesmen & E-Rapor',
    keuangan: 'Keuangan SPP & Midtrans',
    perizinan: 'Perizinan & Sakit Siswa',
    jadwal: 'Jadwal Pelajaran & Ruang',
    ekskul: 'Ekstrakurikuler Siswa',
    kenaikankelas: 'Kenaikan Kelas & Rotasi',
    laporan: 'Pusat Laporan & Ekspor',
    auditlog: 'Audit Log & Keamanan'
  };

  const roleOptions: {
    key: Role;
    label: string;
    category: string;
    jabatan: string;
    desc: string;
  }[] = [
    {
      key: 'admin',
      label: 'Bambang Kusuma, M.M.',
      category: 'Admin Aplikasi',
      jabatan: 'Kepala TU (Full Control)',
      desc: 'Kelola akun, penugasan jabatan, data sekolah & kalender'
    },
    {
      key: 'wali_kelas',
      label: 'Hendra Wijaya, S.Pd.',
      category: 'Guru (Pendidik)',
      jabatan: 'Wali Kelas XI MIPA 1 & Fisika',
      desc: 'Monitoring rombel binaan, perizinan siswa, dan finalisasi rapor'
    },
    {
      key: 'guru',
      label: 'Ratna Sari Dewi, M.Pd.',
      category: 'Guru (Pendidik)',
      jabatan: 'Guru Matematika & Guru Piket',
      desc: 'Presensi jam tatap muka, jurnal harian, dan input nilai tugas'
    },
    {
      key: 'keuangan',
      label: 'Sri Wahyuni, S.E.',
      category: 'Staf Non-Guru',
      jabatan: 'Bendahara Sekolah',
      desc: 'Pengelolaan SPP, kasir tunai, dan rekonsiliasi Midtrans'
    },
    {
      key: 'kurikulum',
      label: 'Dr. Agus Santoso, M.Pd.',
      category: 'Guru (Pendidik)',
      jabatan: 'Admin Kurikulum',
      desc: 'Struktur kurikulum, jadwal bebas bentrok, dan supervisi KBM'
    },
    {
      key: 'siswa',
      label: 'Dimas Arya Pratama',
      category: 'Siswa',
      jabatan: 'XI MIPA 1 (Siswa)',
      desc: 'Portal belajar, bayar SPP online via QRIS, dan pengajuan izin'
    }
  ];

  const pillTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'penugasan', label: 'Akun & Jabatan' },
    { id: 'presensi', label: 'Presensi' },
    { id: 'jurnal', label: 'Jurnal Guru' },
    { id: 'penilaian', label: 'Nilai & Rapor' },
    { id: 'keuangan', label: 'Keuangan' }
  ];

  return (
    <>
      {/* FIXED TOP NAVBAR */}
      <header className="fixed top-0 left-0 right-0 h-16 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] px-4 sm:px-6 flex items-center justify-between">
        {/* Left: Brand & School ID */}
        <div className="flex items-center gap-3">
          {/* Mobile hamburger menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer relative"
            title="Buka Menu Navigasi"
            aria-label="Buka Menu Navigasi"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5" />}
            {(pendingLeaves.length > 0 || unpaidInvoices.length > 0) && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div className="text-left hidden sm:block">
              <h1 className="text-sm font-extrabold tracking-tight text-slate-900 font-['Outfit'] leading-none">
                Edutera SIM
              </h1>
              <span className="text-[10px] text-slate-500 font-medium">
                SMA N 1 Nusantara
              </span>
            </div>
          </button>

          {/* Active Module Indicator pill */}
          <div className="hidden lg:flex items-center gap-2 pl-3 ml-2 border-l border-slate-200">
            <span className="text-xs font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/70 font-['Outfit']">
              {tabTitleMap[activeTab] || 'Dashboard'}
            </span>
          </div>
        </div>

        {/* Center: Desktop Navigation Pills */}
        <div className="hidden xl:flex items-center gap-1 p-1 rounded-full bg-slate-100/90 border border-slate-200 shadow-inner">
          {pillTabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? isCrowz
                      ? 'bg-white text-[#d97453] shadow-sm font-bold'
                      : 'bg-white text-blue-700 shadow-sm border border-slate-200/80 font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Right Action Icons: Search, Theme, Notification, Account Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search */}
          <div className="relative hidden md:block">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Cari siswa, jurnal..."
              className="pl-8 pr-3 py-1.5 w-36 lg:w-48 text-xs rounded-full bg-slate-100/90 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Theme switcher */}
          <button
            onClick={() => setThemeMode(themeMode === 'edutera' ? 'crowz' : 'edutera')}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition-colors"
            title="Ganti Tema Warna"
          >
            <Palette className="w-4 h-4 text-blue-600" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifDropdown(!showNotifDropdown)}
              className="relative p-2 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition-colors"
              title="Notifikasi"
            >
              <Bell className="w-4 h-4" />
              {(pendingLeaves.length > 0 || unpaidInvoices.length > 0) && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 z-50 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h4 className="text-xs font-bold text-slate-800">Pemberitahuan Sistem</h4>
                  <span className="text-[10px] text-blue-600 font-semibold cursor-pointer" onClick={() => setShowNotifDropdown(false)}>
                    Tutup
                  </span>
                </div>
                <div className="divide-y divide-slate-50 max-h-60 overflow-y-auto mt-1">
                  {pendingLeaves.length > 0 && (
                    <div
                      onClick={() => {
                        setActiveTab('perizinan');
                        setShowNotifDropdown(false);
                      }}
                      className="py-2.5 px-2 hover:bg-blue-50/60 rounded-xl cursor-pointer transition-colors"
                    >
                      <p className="text-xs font-semibold text-slate-800">
                        {pendingLeaves.length} Pengajuan Izin Menunggu
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {pendingLeaves[0]?.student_name} ({pendingLeaves[0]?.type}) - Perlu persetujuan Wali Kelas
                      </p>
                    </div>
                  )}
                  <div
                    onClick={() => {
                      setActiveTab('keuangan');
                      setShowNotifDropdown(false);
                    }}
                    className="py-2.5 px-2 hover:bg-blue-50/60 rounded-xl cursor-pointer transition-colors"
                  >
                    <p className="text-xs font-semibold text-slate-800">
                      SPP November 2026 Aktif
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Dukung simulasi Midtrans Snap & Kuitansi sah
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Account & Multi-Jabatan Switcher (Interactive RBAC simulation) */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-full bg-slate-100/90 hover:bg-slate-200/90 border border-slate-200 transition-all shadow-sm"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-full object-cover ring-2 ring-blue-500/30"
              />
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[120px]">
                  {currentUser.name}
                </p>
                <p className="text-[10px] text-blue-600 font-semibold leading-none truncate max-w-[120px]">
                  {currentUser.assignments && currentUser.assignments.length > 0
                    ? currentUser.assignments[0]?.jabatan_title
                    : currentUser.user_category?.replace('_', ' ')}
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {/* Account Switcher Dropdown */}
            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 animate-in fade-in duration-150">
                <div className="px-3 py-2 border-b border-slate-100 mb-1">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-blue-600" /> Akun & Jabatan Aktif
                    </p>
                    <button
                      onClick={() => {
                        setActiveTab('penugasan');
                        setShowRoleDropdown(false);
                      }}
                      className="text-[10px] text-blue-600 font-bold hover:underline flex items-center gap-1"
                    >
                      <KeyRound className="w-3 h-3" /> Kelola Penugasan
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Pilih akun pengguna untuk menguji izin & lingkup kerja:
                  </p>
                </div>

                <div className="space-y-1 max-h-72 overflow-y-auto">
                  {roleOptions.map(opt => {
                    const isSelected = role === opt.key;
                    return (
                      <button
                        key={opt.key}
                        onClick={() => {
                          setRole(opt.key);
                          setShowRoleDropdown(false);
                        }}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all ${
                          isSelected
                            ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {opt.label}
                          </p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-700">
                              {opt.category}
                            </span>
                            <span className="text-[10px] text-slate-500 truncate">
                              {opt.jabatan}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{opt.desc}</p>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-blue-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
