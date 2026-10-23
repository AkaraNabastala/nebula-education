import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  ShieldCheck,
  CheckCircle2,
  Filter,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const JadwalModule: React.FC = () => {
  const { schedule, classes } = useApp();

  const [selectedDay, setSelectedDay] = useState<string>('all');
  const [selectedClass, setSelectedClass] = useState<string>('all');

  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

  const filteredSchedule = schedule.filter(item => {
    if (selectedDay !== 'all' && item.day !== selectedDay) return false;
    if (selectedClass !== 'all' && item.class_name !== selectedClass && item.class_name !== 'Semua Kelas') return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Header */}
      <div className="p-6 rounded-[32px] bg-white/80 backdrop-blur-md border border-white/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
            Jadwal Pelajaran & Alokasi Ruang KBM
          </h3>
          <p className="text-xs text-slate-500">
            Sistem validasi bentrok jadwal guru, rombel kelas, dan penggunaan laboratorium
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Status: Bebas Bentrok Jadwal (0 Conflict)</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setSelectedDay('all')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            selectedDay === 'all'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white/80 text-slate-600 border border-slate-200'
          }`}
        >
          Semua Hari
        </button>
        {days.map(d => (
          <button
            key={d}
            onClick={() => setSelectedDay(d)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              selectedDay === d
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white/80 text-slate-600 border border-slate-200'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Timetable Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSchedule.map(item => (
          <div
            key={item.id}
            className="p-5 rounded-[28px] bg-white/80 backdrop-blur-md border border-white/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)] hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-700 text-[11px] font-extrabold uppercase">
                {item.day}
              </span>
              <span className="text-xs font-mono font-semibold text-slate-600 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {item.time_slot}
              </span>
            </div>

            <div className="mt-3 space-y-2">
              <h4 className="text-sm font-extrabold text-slate-900 leading-snug">
                {item.subject_name}
              </h4>
              <div className="space-y-1 text-xs text-slate-600">
                <p className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>{item.teacher_name}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-slate-400" />
                  <span>Kelas: <strong className="text-slate-800">{item.class_name}</strong></span>
                </p>
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Ruang: <strong className="text-blue-700 font-mono">{item.room}</strong></span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
