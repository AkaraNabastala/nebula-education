import React from 'react';
import {
  Home,
  Layers,
  Calendar,
  CheckCircle2,
  BookOpen,
  FileText,
  CreditCard,
  MessageSquare,
  FileSpreadsheet,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Zap,
  Compass,
  ArrowRightLeft,
  KeyRound,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Role } from '../types';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  badgeColor?: string;
  roles: Role[];
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    role,
    leaves,
    invoices,
    themeMode,
    isSidebarExpanded,
    setIsSidebarExpanded,
    currentUser
  } = useApp();

  const isCrowz = themeMode === 'crowz';

  const pendingLeavesCount = leaves.filter(l => l.status === 'Menunggu Verifikasi').length;
  const overdueInvoicesCount = invoices.filter(i => i.status === 'overdue').length;

  const menuSections: MenuSection[] = [
    {
      title: 'MENU UTAMA',
      items: [
        {
          id: 'overview',
          label: 'Dashboard Utama',
          icon: Home,
          roles: ['admin', 'guru', 'wali_kelas', 'keuangan', 'siswa', 'kurikulum']
        }
      ]
    },
    {
      title: 'SISTEM AKUN & HAK AKSES',
      items: [
        {
          id: 'penugasan',
          label: 'Penugasan Jabatan (RBAC)',
          icon: KeyRound,
          roles: ['admin', 'kurikulum']
        },
        {
          id: 'datainduk',
          label: 'Data Induk & Master',
          icon: Layers,
          roles: ['admin', 'kurikulum']
        },
        {
          id: 'jadwal',
          label: 'Jadwal KBM & Ruang',
          icon: Calendar,
          roles: ['admin', 'guru', 'wali_kelas', 'siswa', 'kurikulum']
        }
      ]
    },
    {
      title: 'AKADEMIK & PEMBELAJARAN',
      items: [
        {
          id: 'presensi',
          label: 'Presensi KBM & Sesi',
          icon: CheckCircle2,
          roles: ['admin', 'guru', 'wali_kelas', 'kurikulum', 'siswa']
        },
        {
          id: 'jurnal',
          label: 'Jurnal Mengajar Guru',
          icon: BookOpen,
          roles: ['admin', 'guru', 'kurikulum']
        },
        {
          id: 'ekskul',
          label: 'Ekstrakurikuler',
          icon: Compass,
          roles: ['admin', 'guru', 'wali_kelas', 'siswa']
        }
      ]
    },
    {
      title: 'PENILAIAN & E-RAPOR',
      items: [
        {
          id: 'penilaian',
          label: 'Nilai Asesmen & Rapor',
          icon: FileText,
          roles: ['admin', 'guru', 'wali_kelas', 'siswa']
        }
      ]
    },
    {
      title: 'KESISWAAN & WALI KELAS',
      items: [
        {
          id: 'perizinan',
          label: 'Perizinan & Sakit Siswa',
          icon: MessageSquare,
          badge: pendingLeavesCount > 0 ? pendingLeavesCount : undefined,
          badgeColor: 'bg-amber-500',
          roles: ['admin', 'wali_kelas', 'siswa']
        },
        {
          id: 'kenaikankelas',
          label: 'Kenaikan Kelas & Rotasi',
          icon: ArrowRightLeft,
          roles: ['admin', 'kurikulum', 'wali_kelas']
        }
      ]
    },
    {
      title: 'KEUANGAN & ADMINISTRASI',
      items: [
        {
          id: 'keuangan',
          label: 'SPP & Midtrans Gateway',
          icon: CreditCard,
          badge: overdueInvoicesCount > 0 ? overdueInvoicesCount : undefined,
          badgeColor: 'bg-rose-500',
          roles: ['admin', 'keuangan', 'siswa']
        },
        {
          id: 'laporan',
          label: 'Pusat Laporan & Ekspor',
          icon: FileSpreadsheet,
          roles: ['admin', 'keuangan', 'kurikulum', 'wali_kelas']
        },
        {
          id: 'auditlog',
          label: 'Audit Log & Keamanan',
          icon: ShieldCheck,
          roles: ['admin', 'kurikulum']
        }
      ]
    }
  ];

  return (
    <>
      {/* Desktop FIXED Sidebar */}
      <aside
        className={`hidden md:flex flex-col justify-between fixed top-16 left-0 bottom-0 z-30 transition-all duration-300 select-none shadow-xl border-r ${
          isSidebarExpanded ? 'w-64 lg:w-68 px-3.5 py-4' : 'w-20 px-2.5 py-4 items-center'
        } ${
          isCrowz
            ? 'bg-[#d97453] text-white border-orange-400/20 shadow-orange-950/15'
            : 'bg-[#0b1021] text-white border-white/5 shadow-2xl'
        }`}
      >
        {/* User Status / Active Assignment Card */}
        <div className="w-full flex flex-col gap-2">
          {isSidebarExpanded ? (
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/40 shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate leading-tight">
                    {currentUser.name}
                  </p>
                  <p className="text-[10px] text-blue-400 font-semibold truncate capitalize mt-0.5">
                    {currentUser.user_category?.replace('_', ' ')}
                  </p>
                </div>
              </div>

              {/* Sidebar toggle button */}
              <button
                onClick={() => setIsSidebarExpanded(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Ciutkan Sidebar"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsSidebarExpanded(true)}
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors mx-auto mb-2"
              title="Lebarkan Sidebar"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {/* Active Jabatan Pill badge if expanded */}
          {isSidebarExpanded && currentUser.assignments && currentUser.assignments.length > 0 && (
            <div className="px-2 py-1.5 rounded-xl bg-blue-500/15 border border-blue-400/20 text-[10px] text-blue-200 flex items-center gap-1.5 truncate">
              <UserCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="truncate font-medium">
                Tugas: {currentUser.assignments[0]?.jabatan_title}
              </span>
            </div>
          )}
        </div>

        {/* Scrollable Navigation Items */}
        <div className="w-full flex-1 overflow-y-auto my-3 py-1 pr-1 space-y-4">
          {menuSections.map((section, idx) => {
            const availableItems = section.items.filter(item => item.roles.includes(role));
            if (availableItems.length === 0) return null;

            return (
              <div key={idx} className="space-y-1">
                {isSidebarExpanded ? (
                  <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400/80 px-3 py-1">
                    {section.title}
                  </p>
                ) : (
                  <div className="h-px bg-white/10 mx-2 my-2" />
                )}

                <div className="space-y-1">
                  {availableItems.map(item => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        title={!isSidebarExpanded ? item.label : undefined}
                        className={`w-full flex items-center rounded-2xl transition-all duration-150 group relative ${
                          isSidebarExpanded
                            ? 'px-3 py-2.5 gap-3 text-left'
                            : 'w-11 h-11 justify-center mx-auto'
                        } ${
                          isActive
                            ? isCrowz
                              ? 'bg-white text-[#d97453] shadow-md font-bold'
                              : 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-bold'
                            : 'text-slate-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <Icon className="w-4.5 h-4.5 shrink-0 transition-transform group-hover:scale-110" />

                        {isSidebarExpanded && (
                          <span className="text-xs font-medium truncate flex-1">
                            {item.label}
                          </span>
                        )}

                        {item.badge !== undefined && (
                          <span
                            className={`${
                              isSidebarExpanded
                                ? 'px-2 py-0.5 rounded-full text-[10px] font-bold text-white'
                                : 'absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold text-white flex items-center justify-center border-2 border-[#0b1021]'
                            } ${item.badgeColor || 'bg-rose-500'}`}
                          >
                            {item.badge}
                          </span>
                        )}

                        {!isSidebarExpanded && (
                          <span className="absolute left-full ml-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl border border-white/15 z-50">
                            {item.label}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="w-full pt-2 border-t border-white/10 px-2">
          {isSidebarExpanded ? (
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5 text-[10px]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Ganjil 2026/2027
              </span>
              <span className="font-mono text-[9px] bg-white/10 px-1.5 py-0.5 rounded">v2.5</span>
            </div>
          ) : (
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 mx-auto" title="Status: Online" />
          )}
        </div>
      </aside>

      {/* Mobile Fixed Bottom Nav */}
      <nav
        className={`md:hidden fixed bottom-0 left-0 right-0 py-2 px-3 flex items-center justify-around z-40 backdrop-blur-xl border-t shadow-2xl ${
          isCrowz
            ? 'bg-[#d97453]/95 text-white border-orange-300/30'
            : 'bg-[#0b1021]/95 text-white border-white/10'
        }`}
      >
        {[
          { id: 'overview', icon: Home, label: 'Beranda' },
          { id: 'presensi', icon: CheckCircle2, label: 'Presensi' },
          { id: 'jurnal', icon: BookOpen, label: 'Jurnal' },
          { id: 'penilaian', icon: FileText, label: 'Nilai' },
          { id: 'keuangan', icon: CreditCard, label: 'SPP', badge: overdueInvoicesCount },
          { id: 'perizinan', icon: MessageSquare, label: 'Izin', badge: pendingLeavesCount }
        ].map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
                isActive
                  ? isCrowz
                    ? 'bg-white text-[#d97453] font-bold'
                    : 'bg-blue-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.badge && item.badge > 0 ? (
                <span className="absolute -top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              ) : null}
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
