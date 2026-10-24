export type Role = 'admin' | 'guru' | 'wali_kelas' | 'keuangan' | 'siswa' | 'kurikulum';

export type UserCategory = 'admin_aplikasi' | 'guru' | 'siswa' | 'staf';

export type JabatanType =
  | 'admin_kurikulum'
  | 'bendahara'
  | 'wali_kelas'
  | 'pembina_ekskul'
  | 'guru_piket'
  | 'admin_kesiswaan';

export type PermissionKey =
  | 'MANAGE_USERS'
  | 'MANAGE_ASSIGNMENTS'
  | 'VIEW_ALL_STUDENTS'
  | 'MANAGE_STUDENTS'
  | 'RECORD_ATTENDANCE'
  | 'MANAGE_CURRICULUM'
  | 'INPUT_GRADES'
  | 'VERIFY_LEAVES'
  | 'MANAGE_FINANCE'
  | 'VIEW_FINANCE'
  | 'VIEW_OWN_ACADEMIC'
  | 'PAY_TUITION'
  | 'SUPERVISE_EKSKUL'
  | 'MANAGE_SCHEDULE'
  | 'VIEW_AUDIT_LOGS';

export interface UserAssignment {
  id: string;
  user_id: string;
  user_name: string;
  jabatan: JabatanType;
  jabatan_title: string;
  scope_type: 'kelas' | 'ekskul' | 'institusi' | 'sesi';
  scope_id?: string;
  scope_name?: string;
  start_date: string;
  end_date?: string;
  is_active: boolean;
  assigned_by: string;
  assigned_at: string;
  permissions: PermissionKey[];
}

export type ThemeMode = 'edutera' | 'crowz';

export interface User {
  id: string;
  name: string;
  role: Role;
  user_category: UserCategory;
  nip_nisn: string;
  email: string;
  avatar: string;
  class_id?: string;
  class_name?: string;
  phone?: string;
  title?: string;
  assignments?: UserAssignment[];
  effective_permissions?: PermissionKey[];
}

export interface Student {
  id: string;
  nisn: string;
  nis: string;
  name: string;
  gender: 'L' | 'P';
  class_id: string;
  class_name: string;
  attendance_rate: number;
  payment_status: 'Lunas' | 'Ada Tunggakan';
  phone: string;
  parent_name: string;
  parent_phone: string;
  address: string;
  status: 'Aktif' | 'Mutasi' | 'Lulus';
}

export interface Teacher {
  id: string;
  nip: string;
  name: string;
  gender: 'L' | 'P';
  email: string;
  phone: string;
  subjects: string[];
  is_homeroom: boolean;
  homeroom_class?: string;
  avatar: string;
}

export interface ClassRoom {
  id: string;
  name: string;
  grade_level: 10 | 11 | 12 | 7 | 8 | 9;
  major: string;
  homeroom_teacher_name: string;
  homeroom_teacher_id: string;
  total_students: number;
  room: string;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  grade_level: number;
  weekly_hours: number;
  curriculum: string;
}

export type InvoiceStatus = 'paid' | 'upcoming' | 'overdue' | 'pending';

export interface Invoice {
  id: string;
  invoice_no: string;
  student_id: string;
  student_name: string;
  student_nisn: string;
  class_name: string;
  title: string;
  description: string;
  amount: number;
  amount_paid: number;
  due_date: string;
  status: InvoiceStatus;
  payment_method?: string;
  paid_at?: string;
  category: 'SPP' | 'Uang Gedung' | 'Kegiatan' | 'Ujian' | 'Praktikum';
}

export type AttendanceStatus = 'Hadir' | 'Sakit' | 'Izin' | 'Terlambat' | 'Alpa';

export interface AttendanceRecord {
  id: string;
  date: string;
  time_slot: string;
  subject_name: string;
  class_id: string;
  class_name: string;
  teacher_id: string;
  teacher_name: string;
  student_id: string;
  student_name: string;
  status: AttendanceStatus;
  notes?: string;
}

export interface TeachingJournal {
  id: string;
  date: string;
  time_slot: string;
  class_id: string;
  class_name: string;
  subject_name: string;
  teacher_name: string;
  topic: string;
  learning_competency: string;
  activities_summary: string;
  teaching_method: string;
  obstacles_followup: string;
  status: 'Selesai' | 'Draft' | 'Digantikan';
  substitute_teacher_name?: string;
  attendance_summary: {
    hadir: number;
    sakit: number;
    izin: number;
    alpa: number;
  };
}

export interface StudentScore {
  student_id: string;
  student_name: string;
  student_nisn: string;
  tugas1: number;
  tugas2: number;
  uts: number;
  uas: number;
  final_score: number;
  predicate: 'A' | 'B' | 'C' | 'D';
  notes: string;
}

export interface AssessmentSubject {
  subject_id: string;
  subject_name: string;
  class_name: string;
  teacher_name: string;
  kkm: number;
  scores: StudentScore[];
}

export interface StudentLeaveRequest {
  id: string;
  student_id: string;
  student_name: string;
  class_name: string;
  type: 'Sakit' | 'Izin';
  start_date: string;
  end_date: string;
  reason: string;
  attachment_name?: string;
  status: 'Menunggu Verifikasi' | 'Disetujui' | 'Ditolak';
  reviewed_by?: string;
  reviewed_at?: string;
  review_notes?: string;
}

export interface ScheduleItem {
  id: string;
  day: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat';
  time_slot: string;
  subject_name: string;
  class_name: string;
  teacher_name: string;
  room: string;
}

export interface Extracurricular {
  id: string;
  name: string;
  category: 'Olahraga' | 'Seni & Budaya' | 'Sains & Teknologi' | 'Kepemimpinan';
  coach_name: string;
  schedule: string;
  room: string;
  total_members: number;
}

export interface ClassPromotionDraft {
  student_id: string;
  student_name: string;
  current_class: string;
  target_class: string;
  status: 'Naik Kelas' | 'Tinggal Kelas' | 'Lulus';
  notes: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  user_name: string;
  role: string;
  action: string;
  entity: string;
  details: string;
  ip_address: string;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  content: string;
  author: string;
  tag: 'Akademik' | 'Keuangan' | 'Kegiatan' | 'Penting';
}
