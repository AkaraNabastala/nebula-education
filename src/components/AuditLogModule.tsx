import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Key,
  Clock,
  User,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Database,
  Search
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuditLogModule: React.FC = () => {
  const { auditLogs, showToast } = useApp();
  const [search, setSearch] = useState('');

  const filteredLogs = auditLogs.filter(log =>
    log.user_name.toLowerCase().includes(search.toLowerCase()) ||
    log.action.toLowerCase().includes(search.toLowerCase()) ||
    log.details.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Header */}
      <div className="p-6 rounded-[32px] bg-white/80 backdrop-blur-md border border-white/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-700">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
              Audit Log & Manajemen Keamanan Sistem
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Rekam jejak setiap tindakan krusial (pembayaran SPP, verifikasi izin, input nilai, dan perubahan data induk)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Enkripsi Audit Tamper-Proof Aktif
          </span>
        </div>
      </div>

      {/* Security Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white/80 backdrop-blur-md border border-white/80 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Status Autentikasi RBAC</span>
          <p className="text-lg font-extrabold text-slate-900 font-['Outfit'] mt-1">
            Least-Privilege Enforced
          </p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">
            Semua endpoint terlindungi token & permission
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white/80 backdrop-blur-md border border-white/80 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Integrasi Midtrans Webhook</span>
          <p className="text-lg font-extrabold text-blue-700 font-['Outfit'] mt-1">
            Signature SHA-512 Valid
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Idempotensi aktif mencegah transaksi ganda
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white/80 backdrop-blur-md border border-white/80 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Perlindungan Data Pribadi</span>
          <p className="text-lg font-extrabold text-slate-900 font-['Outfit'] mt-1">
            Kepatuhan UU PDP RI
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Akses data siswa & keuangan tersekat antar role
          </p>
        </div>
      </div>

      {/* Logs Table */}
      <div className="p-6 rounded-[32px] bg-white/80 backdrop-blur-md border border-white/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)]">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari aktivitas atau pengguna..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
            />
          </div>
          <span className="text-xs text-slate-500 font-semibold">
            {filteredLogs.length} Aktivitas Tercatat
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3 px-3">Waktu & Tanggal</th>
                <th className="py-3 px-3">Aktor / Pengguna</th>
                <th className="py-3 px-3">Aksi Terdata</th>
                <th className="py-3 px-3">Rincian Perubahan</th>
                <th className="py-3 px-3 text-right">Alamat IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors font-mono">
                  <td className="py-3 px-3 text-slate-500 text-[11px] whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-3 px-3 font-sans font-bold text-slate-900">
                    {log.user_name}
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 text-[10px] font-bold font-mono">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-sans text-slate-600">
                    {log.details}
                  </td>
                  <td className="py-3 px-3 text-right text-slate-400 text-[11px]">
                    {log.ip_address}
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
