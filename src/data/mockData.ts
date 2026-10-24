import {
  User,
  Student,
  Teacher,
  ClassRoom,
  Subject,
  Invoice,
  TeachingJournal,
  AssessmentSubject,
  StudentLeaveRequest,
  ScheduleItem,
  Announcement,
  UserAssignment
} from '../types';

export const INITIAL_ASSIGNMENTS: UserAssignment[] = [
  {
    id: 'asg_01',
    user_id: 'usr_wali',
    user_name: 'Hendra Wijaya, S.Pd., M.Si.',
    jabatan: 'wali_kelas',
    jabatan_title: 'Wali Kelas XI MIPA 1',
    scope_type: 'kelas',
    scope_id: 'cls_xi_mipa1',
    scope_name: 'XI MIPA 1',
    start_date: '2026-07-15',
    end_date: '2027-06-30',
    is_active: true,
    assigned_by: 'Bambang Kusuma, M.M. (Admin)',
    assigned_at: '2026-07-10',
    permissions: ['VERIFY_LEAVES', 'VIEW_ALL_STUDENTS', 'RECORD_ATTENDANCE', 'INPUT_GRADES']
  },
  {
    id: 'asg_02',
    user_id: 'usr_kurikulum',
    user_name: 'Dr. Agus Santoso, M.Pd.',
    jabatan: 'admin_kurikulum',
    jabatan_title: 'Wakil Kepala Bagian Kurikulum',
    scope_type: 'institusi',
    scope_name: 'Seluruh Rombel & KBM',
    start_date: '2026-07-01',
    end_date: '2027-06-30',
    is_active: true,
    assigned_by: 'Bambang Kusuma, M.M. (Admin)',
    assigned_at: '2026-07-01',
    permissions: ['MANAGE_CURRICULUM', 'MANAGE_SCHEDULE', 'INPUT_GRADES', 'VIEW_ALL_STUDENTS']
  },
  {
    id: 'asg_03',
    user_id: 'usr_keuangan',
    user_name: 'Sri Wahyuni, S.E.',
    jabatan: 'bendahara',
    jabatan_title: 'Bendahara Sekolah / Keuangan',
    scope_type: 'institusi',
    scope_name: 'SPP & Keuangan Sekolah',
    start_date: '2026-01-01',
    end_date: '2026-12-31',
    is_active: true,
    assigned_by: 'Bambang Kusuma, M.M. (Admin)',
    assigned_at: '2026-01-02',
    permissions: ['MANAGE_FINANCE', 'VIEW_FINANCE', 'VIEW_ALL_STUDENTS']
  },
  {
    id: 'asg_04',
    user_id: 'tch_04',
    user_name: 'Ahmad Fauzi, S.Kom.',
    jabatan: 'pembina_ekskul',
    jabatan_title: 'Pembina Ekskul Robotik & Rekayasa IoT',
    scope_type: 'ekskul',
    scope_id: 'ex_01',
    scope_name: 'Robotik & Rekayasa IoT',
    start_date: '2026-08-01',
    end_date: '2027-06-30',
    is_active: true,
    assigned_by: 'Bambang Kusuma, M.M. (Admin)',
    assigned_at: '2026-08-01',
    permissions: ['SUPERVISE_EKSKUL', 'VIEW_ALL_STUDENTS']
  },
  {
    id: 'asg_05',
    user_id: 'usr_guru',
    user_name: 'Ratna Sari Dewi, M.Pd.',
    jabatan: 'guru_piket',
    jabatan_title: 'Guru Piket KBM Harian (Senin)',
    scope_type: 'sesi',
    scope_name: 'KBM Hari Senin',
    start_date: '2026-07-15',
    end_date: '2026-12-31',
    is_active: true,
    assigned_by: 'Dr. Agus Santoso, M.Pd. (Kurikulum)',
    assigned_at: '2026-07-15',
    permissions: ['RECORD_ATTENDANCE', 'VIEW_ALL_STUDENTS']
  }
];

export const INITIAL_USERS: Record<string, User> = {
  admin: {
    id: 'usr_admin',
    name: 'Bambang Kusuma, M.M.',
    role: 'admin',
    user_category: 'admin_aplikasi',
    nip_nisn: '19750812 199903 1 002',
    email: 'admin@edutera.sch.id',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    title: 'Admin Aplikasi & Kepala Tata Usaha',
    effective_permissions: [
      'MANAGE_USERS',
      'MANAGE_ASSIGNMENTS',
      'VIEW_ALL_STUDENTS',
      'MANAGE_STUDENTS',
      'RECORD_ATTENDANCE',
      'MANAGE_CURRICULUM',
      'INPUT_GRADES',
      'VERIFY_LEAVES',
      'MANAGE_FINANCE',
      'VIEW_FINANCE',
      'VIEW_OWN_ACADEMIC',
      'PAY_TUITION',
      'SUPERVISE_EKSKUL',
      'MANAGE_SCHEDULE',
      'VIEW_AUDIT_LOGS'
    ]
  },
  guru: {
    id: 'usr_guru',
    name: 'Ratna Sari Dewi, M.Pd.',
    role: 'guru',
    user_category: 'guru',
    nip_nisn: '19820415 200604 2 011',
    email: 'ratna.sari@edutera.sch.id',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    title: 'Guru Matematika (Tugas Tambahan: Guru Piket)',
    effective_permissions: ['RECORD_ATTENDANCE', 'INPUT_GRADES', 'VIEW_ALL_STUDENTS', 'MANAGE_SCHEDULE']
  },
  wali_kelas: {
    id: 'usr_wali',
    name: 'Hendra Wijaya, S.Pd., M.Si.',
    role: 'wali_kelas',
    user_category: 'guru',
    nip_nisn: '19791120 200501 1 008',
    email: 'hendra.wijaya@edutera.sch.id',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    class_id: 'cls_xi_mipa1',
    class_name: 'XI MIPA 1',
    title: 'Guru Fisika (Jabatan: Wali Kelas XI MIPA 1)',
    effective_permissions: ['VERIFY_LEAVES', 'VIEW_ALL_STUDENTS', 'RECORD_ATTENDANCE', 'INPUT_GRADES', 'MANAGE_SCHEDULE']
  },
  keuangan: {
    id: 'usr_keuangan',
    name: 'Sri Wahyuni, S.E.',
    role: 'keuangan',
    user_category: 'staf',
    nip_nisn: '19870314 201101 2 004',
    email: 'keuangan@edutera.sch.id',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    title: 'Staf Tenaga Kependidikan (Jabatan: Bendahara Sekolah)',
    effective_permissions: ['MANAGE_FINANCE', 'VIEW_FINANCE', 'VIEW_ALL_STUDENTS']
  },
  siswa: {
    id: 'usr_siswa',
    name: 'Dimas Arya Pratama',
    role: 'siswa',
    user_category: 'siswa',
    nip_nisn: '0065489123',
    email: 'dimas.arya@siswa.edutera.sch.id',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    class_id: 'cls_xi_mipa1',
    class_name: 'XI MIPA 1',
    title: 'Peserta Didik Fase F (XI MIPA 1)',
    effective_permissions: ['VIEW_OWN_ACADEMIC', 'PAY_TUITION']
  },
  kurikulum: {
    id: 'usr_kurikulum',
    name: 'Dr. Agus Santoso, M.Pd.',
    role: 'kurikulum',
    user_category: 'guru',
    nip_nisn: '19710925 199702 1 003',
    email: 'kurikulum@edutera.sch.id',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    title: 'Guru Senior (Jabatan: Admin Kurikulum)',
    effective_permissions: ['MANAGE_CURRICULUM', 'MANAGE_SCHEDULE', 'INPUT_GRADES', 'VIEW_ALL_STUDENTS', 'RECORD_ATTENDANCE']
  }
};


export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'std_01',
    nisn: '0065489123',
    nis: '23241001',
    name: 'Dimas Arya Pratama',
    gender: 'L',
    class_id: 'cls_xi_mipa1',
    class_name: 'XI MIPA 1',
    attendance_rate: 98.4,
    payment_status: 'Ada Tunggakan',
    phone: '081234567890',
    parent_name: 'Budi Pratama',
    parent_phone: '081298765432',
    address: 'Jl. Merdeka No. 12, Kebayoran Baru, Jakarta Selatan',
    status: 'Aktif'
  },
  {
    id: 'std_02',
    nisn: '0065489124',
    nis: '23241002',
    name: 'Siti Nurhaliza Putri',
    gender: 'P',
    class_id: 'cls_xi_mipa1',
    class_name: 'XI MIPA 1',
    attendance_rate: 100,
    payment_status: 'Lunas',
    phone: '081234567891',
    parent_name: 'Rahmat Hidayat',
    parent_phone: '081298765433',
    address: 'Jl. Melati Indah No. 4, Tebet, Jakarta Selatan',
    status: 'Aktif'
  },
  {
    id: 'std_03',
    nisn: '0065489125',
    nis: '23241003',
    name: 'Budi Santoso',
    gender: 'L',
    class_id: 'cls_xi_mipa1',
    class_name: 'XI MIPA 1',
    attendance_rate: 92.5,
    payment_status: 'Lunas',
    phone: '081234567892',
    parent_name: 'Santoso Widjaja',
    parent_phone: '081298765434',
    address: 'Jl. Cempaka Putih Raya No. 18, Jakarta Pusat',
    status: 'Aktif'
  },
  {
    id: 'std_04',
    nisn: '0065489126',
    nis: '23241004',
    name: 'Amanda Putri Maharani',
    gender: 'P',
    class_id: 'cls_xi_mipa1',
    class_name: 'XI MIPA 1',
    attendance_rate: 96.0,
    payment_status: 'Lunas',
    phone: '081234567893',
    parent_name: 'Ir. Surya Maharani',
    parent_phone: '081298765435',
    address: 'Jl. Anggrek Garuda No. 8, Slipi, Jakarta Barat',
    status: 'Aktif'
  },
  {
    id: 'std_05',
    nisn: '0065489127',
    nis: '23241005',
    name: 'Rizky Ramadhan',
    gender: 'L',
    class_id: 'cls_xi_mipa1',
    class_name: 'XI MIPA 1',
    attendance_rate: 94.2,
    payment_status: 'Ada Tunggakan',
    phone: '081234567894',
    parent_name: 'Drs. Hendro Ramadhan',
    parent_phone: '081298765436',
    address: 'Jl. Gandaria Tengah II No. 15, Jakarta Selatan',
    status: 'Aktif'
  },
  {
    id: 'std_06',
    nisn: '0065489128',
    nis: '23241006',
    name: 'Zahra Aulia Rahma',
    gender: 'P',
    class_id: 'cls_x_mipa1',
    class_name: 'X MIPA 1',
    attendance_rate: 99.0,
    payment_status: 'Lunas',
    phone: '081234567895',
    parent_name: 'Ahmad Faisal',
    parent_phone: '081298765437',
    address: 'Jl. Panglima Polim IX No. 22, Jakarta Selatan',
    status: 'Aktif'
  },
  {
    id: 'std_07',
    nisn: '0065489129',
    nis: '23241007',
    name: 'Fauzan Akbar',
    gender: 'L',
    class_id: 'cls_x_mipa1',
    class_name: 'X MIPA 1',
    attendance_rate: 90.0,
    payment_status: 'Lunas',
    phone: '081234567896',
    parent_name: 'Akbar Tanjung',
    parent_phone: '081298765438',
    address: 'Jl. Fatmawati No. 50, Jakarta Selatan',
    status: 'Aktif'
  },
  {
    id: 'std_08',
    nisn: '0065489130',
    nis: '23241008',
    name: 'Nabila Syakieb',
    gender: 'P',
    class_id: 'cls_xii_mipa1',
    class_name: 'XII MIPA 1',
    attendance_rate: 97.8,
    payment_status: 'Lunas',
    phone: '081234567897',
    parent_name: 'M. Syakieb',
    parent_phone: '081298765439',
    address: 'Jl. Bangka Raya No. 10, Jakarta Selatan',
    status: 'Aktif'
  }
];

export const INITIAL_TEACHERS: Teacher[] = [
  {
    id: 'tch_01',
    nip: '19820415 200604 2 011',
    name: 'Ratna Sari Dewi, M.Pd.',
    gender: 'P',
    email: 'ratna.sari@edutera.sch.id',
    phone: '081345678901',
    subjects: ['Matematika Wajib', 'Matematika Peminatan'],
    is_homeroom: false,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'tch_02',
    nip: '19791120 200501 1 008',
    name: 'Hendra Wijaya, S.Pd., M.Si.',
    gender: 'L',
    email: 'hendra.wijaya@edutera.sch.id',
    phone: '081345678902',
    subjects: ['Fisika'],
    is_homeroom: true,
    homeroom_class: 'XI MIPA 1',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'tch_03',
    nip: '19860610 200902 2 005',
    name: 'Dewi Anggraini, S.Pd.',
    gender: 'P',
    email: 'dewi.anggraini@edutera.sch.id',
    phone: '081345678903',
    subjects: ['Bahasa Indonesia'],
    is_homeroom: true,
    homeroom_class: 'X MIPA 1',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'tch_04',
    nip: '19890218 201403 1 002',
    name: 'Ahmad Fauzi, S.Kom.',
    gender: 'L',
    email: 'ahmad.fauzi@edutera.sch.id',
    phone: '081345678904',
    subjects: ['Informatika', 'Kewirausahaan'],
    is_homeroom: false,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'tch_05',
    nip: '19760512 200112 1 001',
    name: 'Drs. Tri Haryanto, M.M.',
    gender: 'L',
    email: 'tri.haryanto@edutera.sch.id',
    phone: '081345678905',
    subjects: ['Kimia'],
    is_homeroom: true,
    homeroom_class: 'XII MIPA 1',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
  }
];

export const INITIAL_CLASSES: ClassRoom[] = [
  {
    id: 'cls_x_mipa1',
    name: 'X MIPA 1',
    grade_level: 10,
    major: 'MIPA (Kurikulum Merdeka)',
    homeroom_teacher_name: 'Dewi Anggraini, S.Pd.',
    homeroom_teacher_id: 'tch_03',
    total_students: 36,
    room: 'Gedung A - Ruang 101'
  },
  {
    id: 'cls_x_mipa2',
    name: 'X MIPA 2',
    grade_level: 10,
    major: 'MIPA (Kurikulum Merdeka)',
    homeroom_teacher_name: 'Rina Kusuma, S.Pd.',
    homeroom_teacher_id: 'tch_06',
    total_students: 35,
    room: 'Gedung A - Ruang 102'
  },
  {
    id: 'cls_xi_mipa1',
    name: 'XI MIPA 1',
    grade_level: 11,
    major: 'MIPA Unggulan',
    homeroom_teacher_name: 'Hendra Wijaya, S.Pd., M.Si.',
    homeroom_teacher_id: 'tch_02',
    total_students: 36,
    room: 'Gedung B - Ruang 203'
  },
  {
    id: 'cls_xi_ips1',
    name: 'XI IPS 1',
    grade_level: 11,
    major: 'IPS',
    homeroom_teacher_name: 'Budi Raharjo, S.Pd.',
    homeroom_teacher_id: 'tch_07',
    total_students: 34,
    room: 'Gedung B - Ruang 204'
  },
  {
    id: 'cls_xii_mipa1',
    name: 'XII MIPA 1',
    grade_level: 12,
    major: 'MIPA',
    homeroom_teacher_name: 'Drs. Tri Haryanto, M.M.',
    homeroom_teacher_id: 'tch_05',
    total_students: 36,
    room: 'Gedung C - Ruang 301'
  }
];

export const INITIAL_SUBJECTS: Subject[] = [
  { id: 'sbj_01', code: 'MTK-W', name: 'Matematika Wajib', grade_level: 11, weekly_hours: 4, curriculum: 'Kurikulum Merdeka' },
  { id: 'sbj_02', code: 'FIS-11', name: 'Fisika Peminatan', grade_level: 11, weekly_hours: 4, curriculum: 'Kurikulum Merdeka' },
  { id: 'sbj_03', code: 'IND-11', name: 'Bahasa Indonesia', grade_level: 11, weekly_hours: 3, curriculum: 'Kurikulum Merdeka' },
  { id: 'sbj_04', code: 'INF-11', name: 'Informatika', grade_level: 11, weekly_hours: 3, curriculum: 'Kurikulum Merdeka' },
  { id: 'sbj_05', code: 'KIM-11', name: 'Kimia Peminatan', grade_level: 11, weekly_hours: 4, curriculum: 'Kurikulum Merdeka' },
  { id: 'sbj_06', code: 'ING-11', name: 'Bahasa Inggris', grade_level: 11, weekly_hours: 3, curriculum: 'Kurikulum Merdeka' }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv_01',
    invoice_no: 'INV-2026-100102030',
    student_id: 'std_01',
    student_name: 'Dimas Arya Pratama',
    student_nisn: '0065489123',
    class_name: 'XI MIPA 1',
    title: 'SPP Bulan November 2026',
    description: 'Iuran Penyelenggaraan Pendidikan (SPP) Reguler Semester Ganjil',
    amount: 350000,
    amount_paid: 0,
    due_date: '2026-11-10',
    status: 'upcoming',
    category: 'SPP'
  },
  {
    id: 'inv_02',
    invoice_no: 'INV-2026-100102029',
    student_id: 'std_01',
    student_name: 'Dimas Arya Pratama',
    student_nisn: '0065489123',
    class_name: 'XI MIPA 1',
    title: 'SPP Bulan Oktober 2026',
    description: 'Iuran Penyelenggaraan Pendidikan (SPP) Reguler',
    amount: 350000,
    amount_paid: 350000,
    due_date: '2026-10-10',
    status: 'paid',
    payment_method: 'Midtrans QRIS / GoPay',
    paid_at: '2026-10-08T14:22:00Z',
    category: 'SPP'
  },
  {
    id: 'inv_03',
    invoice_no: 'INV-2026-100102028',
    student_id: 'std_02',
    student_name: 'Siti Nurhaliza Putri',
    student_nisn: '0065489124',
    class_name: 'XI MIPA 1',
    title: 'Praktikum Sains & Lab Komputer',
    description: 'Biaya modul praktikum dan lisensi laboratorium sains terpadu',
    amount: 250000,
    amount_paid: 250000,
    due_date: '2026-11-05',
    status: 'paid',
    payment_method: 'Midtrans BCA Virtual Account',
    paid_at: '2026-11-02T09:15:00Z',
    category: 'Praktikum'
  },
  {
    id: 'inv_04',
    invoice_no: 'INV-2026-100102027',
    student_id: 'std_05',
    student_name: 'Rizky Ramadhan',
    student_nisn: '0065489127',
    class_name: 'XI MIPA 1',
    title: 'SPP Bulan Oktober 2026',
    description: 'Iuran Penyelenggaraan Pendidikan (SPP) Reguler',
    amount: 350000,
    amount_paid: 0,
    due_date: '2026-10-10',
    status: 'overdue',
    category: 'SPP'
  },
  {
    id: 'inv_05',
    invoice_no: 'INV-2026-100102026',
    student_id: 'std_04',
    student_name: 'Amanda Putri Maharani',
    student_nisn: '0065489126',
    class_name: 'XI MIPA 1',
    title: 'Uang Kegiatan Karya Wisata Edukasi',
    description: 'Fieldtrip observasi Pusat Riset & Teknologi Nasional',
    amount: 650000,
    amount_paid: 650000,
    due_date: '2026-11-15',
    status: 'paid',
    payment_method: 'Kasir Teller Sekolah (Cash)',
    paid_at: '2026-10-20T11:30:00Z',
    category: 'Kegiatan'
  },
  {
    id: 'inv_06',
    invoice_no: 'INV-2026-100102025',
    student_id: 'std_03',
    student_name: 'Budi Santoso',
    student_nisn: '0065489125',
    class_name: 'XI MIPA 1',
    title: 'SPP Bulan November 2026',
    description: 'Iuran Penyelenggaraan Pendidikan (SPP) Reguler',
    amount: 350000,
    amount_paid: 0,
    due_date: '2026-11-10',
    status: 'upcoming',
    category: 'SPP'
  }
];


export const INITIAL_JOURNALS: TeachingJournal[] = [
  {
    id: 'jrn_01',
    date: '2026-10-22',
    time_slot: 'Jam ke 1-2 (07:00 - 08:30)',
    class_id: 'cls_xi_mipa1',
    class_name: 'XI MIPA 1',
    subject_name: 'Matematika Wajib',
    teacher_name: 'Ratna Sari Dewi, M.Pd.',
    topic: 'Turunan Fungsi Aljabar dan Aplikasi Garis Singgung',
    learning_competency: 'Siswa dapat menentukan turunan fungsi aljabar menggunakan sifat-sifat turunan dan gradien garis singgung kurva.',
    activities_summary: 'Eksplorasi konsep limit menuju diferensial, diskusi kelompok pemecahan masalah kontekstual, kuis interaktif formatif.',
    teaching_method: 'Problem Based Learning (PBL) & Tanya Jawab',
    obstacles_followup: '2 siswa masih kesulitan pada aturan rantai fungsi trigonometri sederhana. Direncanakan bimbingan tutor sebaya pada sesi berikutnya.',
    status: 'Selesai',
    attendance_summary: {
      hadir: 34,
      sakit: 1,
      izin: 1,
      alpa: 0
    }
  },
  {
    id: 'jrn_02',
    date: '2026-10-21',
    time_slot: 'Jam ke 3-4 (08:45 - 10:15)',
    class_id: 'cls_xi_mipa1',
    class_name: 'XI MIPA 1',
    subject_name: 'Fisika Peminatan',
    teacher_name: 'Hendra Wijaya, S.Pd., M.Si.',
    topic: 'Hukum Termodinamika I & Perubahan Energi Dalam',
    learning_competency: 'Menganalisis prinsip kerja mesin kalor berdasarkan siklus Carnot dan efisiensi termal.',
    activities_summary: 'Simulasi virtual gas ideal PhET Interactive Simulations dilanjutkan pengambilan data p-V dan presentasi kelompok.',
    teaching_method: 'Inquiry-Based Learning & Virtual Lab',
    obstacles_followup: 'Seluruh peserta aktif, koneksi lab komputer stabil. Tugas laporan diunggah ke portal paling lambat Jumat.',
    status: 'Selesai',
    attendance_summary: {
      hadir: 35,
      sakit: 1,
      izin: 0,
      alpa: 0
    }
  },
  {
    id: 'jrn_03',
    date: '2026-10-20',
    time_slot: 'Jam ke 5-6 (10:30 - 12:00)',
    class_id: 'cls_x_mipa1',
    class_name: 'X MIPA 1',
    subject_name: 'Informatika',
    teacher_name: 'Ahmad Fauzi, S.Kom.',
    topic: 'Algoritma Percabangan & Perulangan dengan Python',
    learning_competency: 'Menyusun kode program modular dengan struktur kontrol kondisi dan loop sederhana.',
    activities_summary: 'Live coding studi kasus sistem kasir minimarket dan debugging program bersama di kelas.',
    teaching_method: 'Hands-on Practice & Pair Programming',
    obstacles_followup: 'Pemahaman syntax indentation Python perlu penegasan ulang untuk siswa baru.',
    status: 'Selesai',
    attendance_summary: {
      hadir: 36,
      sakit: 0,
      izin: 0,
      alpa: 0
    }
  }
];

export const INITIAL_ASSESSMENT: AssessmentSubject = {
  subject_id: 'sbj_01',
  subject_name: 'Matematika Wajib',
  class_name: 'XI MIPA 1',
  teacher_name: 'Ratna Sari Dewi, M.Pd.',
  kkm: 75,
  scores: [
    {
      student_id: 'std_01',
      student_name: 'Dimas Arya Pratama',
      student_nisn: '0065489123',
      tugas1: 88,
      tugas2: 90,
      uts: 85,
      uas: 89,
      final_score: 88,
      predicate: 'A',
      notes: 'Sangat baik dalam menguasai konsep kalkulus dan penyelesaian soal non-rutin.'
    },
    {
      student_id: 'std_02',
      student_name: 'Siti Nurhaliza Putri',
      student_nisn: '0065489124',
      tugas1: 95,
      tugas2: 96,
      uts: 92,
      uas: 94,
      final_score: 94,
      predicate: 'A',
      notes: 'Luar biasa teliti, selalu aktif dalam diskusi dan membantu teman kelas.'
    },
    {
      student_id: 'std_03',
      student_name: 'Budi Santoso',
      student_nisn: '0065489125',
      tugas1: 78,
      tugas2: 80,
      uts: 76,
      uas: 82,
      final_score: 79,
      predicate: 'B',
      notes: 'Capaian kompetensi tercapai dengan baik, perlu peningkatan latihan soal terapan.'
    },
    {
      student_id: 'std_04',
      student_name: 'Amanda Putri Maharani',
      student_nisn: '0065489126',
      tugas1: 90,
      tugas2: 92,
      uts: 88,
      uas: 91,
      final_score: 90,
      predicate: 'A',
      notes: 'Konsisten menunjukkan dedikasi belajar tinggi dan pemahaman konsep yang kokoh.'
    },
    {
      student_id: 'std_05',
      student_name: 'Rizky Ramadhan',
      student_nisn: '0065489127',
      tugas1: 72,
      tugas2: 75,
      uts: 70,
      uas: 74,
      final_score: 73,
      predicate: 'C',
      notes: 'Perlu remidial pada materi turunan dan meningkatkan ketepatan pengumpulan tugas.'
    }
  ]
};

export const INITIAL_LEAVES: StudentLeaveRequest[] = [
  {
    id: 'lev_01',
    student_id: 'std_01',
    student_name: 'Dimas Arya Pratama',
    class_name: 'XI MIPA 1',
    type: 'Izin',
    start_date: '2026-10-24',
    end_date: '2026-10-25',
    reason: 'Mewakili sekolah dalam Babak Final Olimpiade Sains Matematika Tingkat Provinsi',
    attachment_name: 'Surat_Tugas_OSN_Provinsi.pdf',
    status: 'Menunggu Verifikasi'
  },
  {
    id: 'lev_02',
    student_id: 'std_05',
    student_name: 'Rizky Ramadhan',
    class_name: 'XI MIPA 1',
    type: 'Sakit',
    start_date: '2026-10-21',
    end_date: '2026-10-22',
    reason: 'Demam tinggi dan istirahat dokter (surat keterangan terlampir)',
    attachment_name: 'Surat_Keterangan_Dokter_Klinik_Sehat.pdf',
    status: 'Disetujui',
    reviewed_by: 'Hendra Wijaya, S.Pd., M.Si.',
    reviewed_at: '2026-10-21 07:45 WIB',
    review_notes: 'Izin disetujui. Semoga lekas sembuh, tugas dapat menyusul.'
  },
  {
    id: 'lev_03',
    student_id: 'std_03',
    student_name: 'Budi Santoso',
    class_name: 'XI MIPA 1',
    type: 'Izin',
    start_date: '2026-10-15',
    end_date: '2026-10-15',
    reason: 'Acara pernikahan keluarga kandung di Bandung',
    attachment_name: 'Surat_Izin_Orang_Tua.pdf',
    status: 'Disetujui',
    reviewed_by: 'Hendra Wijaya, S.Pd., M.Si.',
    reviewed_at: '2026-10-14 18:20 WIB',
    review_notes: 'Disetujui.'
  }
];

export const INITIAL_SCHEDULE: ScheduleItem[] = [
  { id: 'sch_01', day: 'Senin', time_slot: '07:00 - 08:30', subject_name: 'Upacara Bendera & Literasi', class_name: 'Semua Kelas', teacher_name: 'Tim Kesiswaan', room: 'Lapangan Utama' },
  { id: 'sch_02', day: 'Senin', time_slot: '08:45 - 10:15', subject_name: 'Matematika Wajib', class_name: 'XI MIPA 1', teacher_name: 'Ratna Sari Dewi, M.Pd.', room: 'R. 203' },
  { id: 'sch_03', day: 'Senin', time_slot: '10:30 - 12:00', subject_name: 'Fisika Peminatan', class_name: 'XI MIPA 1', teacher_name: 'Hendra Wijaya, S.Pd., M.Si.', room: 'Lab Fisika' },
  { id: 'sch_04', day: 'Selasa', time_slot: '07:30 - 09:00', subject_name: 'Bahasa Indonesia', class_name: 'XI MIPA 1', teacher_name: 'Dewi Anggraini, S.Pd.', room: 'R. 203' },
  { id: 'sch_05', day: 'Selasa', time_slot: '09:15 - 10:45', subject_name: 'Informatika', class_name: 'XI MIPA 1', teacher_name: 'Ahmad Fauzi, S.Kom.', room: 'Lab Komputer 2' },
  { id: 'sch_06', day: 'Rabu', time_slot: '07:30 - 09:45', subject_name: 'Kimia Peminatan', class_name: 'XI MIPA 1', teacher_name: 'Drs. Tri Haryanto, M.M.', room: 'Lab Kimia' },
  { id: 'sch_07', day: 'Kamis', time_slot: '08:00 - 10:00', subject_name: 'Pendidikan Agama & Budi Pekerti', class_name: 'XI MIPA 1', teacher_name: 'Ust. Zainal Abidin, M.Pd.I', room: 'Masjid & R. 203' },
  { id: 'sch_08', day: 'Jumat', time_slot: '07:00 - 08:00', subject_name: 'Senam Pagi & Kebersihan', class_name: 'Semua Kelas', teacher_name: 'Wali Kelas & Pembina OSIS', room: 'Area Kampus' }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann_01',
    title: 'Pelaksanaan Asesmen Sumatif Tengah Semester (ASTS) Ganjil',
    date: '22 Okt 2026',
    content: 'Jadwal pelaksanaan ASTS dimulai pada tanggal 2 November 2026. Seluruh siswa diharapkan mengecek kartu peserta ujian di portal dan memastikan kewajiban administrasi telah diselesaikan.',
    author: 'Bagian Kurikulum',
    tag: 'Akademik'
  },
  {
    id: 'ann_02',
    title: 'Pembayaran SPP Bulan November 2026 Telah Dibuka',
    date: '20 Okt 2026',
    content: 'Tagihan SPP bulan November sudah dapat dibayarkan melalui Payment Gateway Midtrans (QRIS, VA Bank) maupun di loket kasir tata usaha.',
    author: 'Bagian Keuangan',
    tag: 'Keuangan'
  },
  {
    id: 'ann_03',
    title: 'Pendaftaran Ekstrakurikuler Robotik & Karya Ilmiah Remaja (KIR)',
    date: '18 Okt 2026',
    content: 'Pendaftaran anggota baru gelombang ke-2 dibuka hingga akhir pekan ini. Seleksi pembinaan berpusat di Lab Rekayasa Multimedia.',
    author: 'Kesiswaan & Ekstrakurikuler',
    tag: 'Kegiatan'
  }
];

export const INITIAL_EXTRACURRICULARS = [
  {
    id: 'ex_01',
    name: 'Robotik & Rekayasa IoT',
    category: 'Sains & Teknologi' as const,
    coach_name: 'Ahmad Fauzi, S.Kom.',
    schedule: 'Rabu & Jumat (15:30 - 17:00)',
    room: 'Lab Komputer 2',
    total_members: 28
  },
  {
    id: 'ex_02',
    name: 'Paskibraka Satya Wira',
    category: 'Kepemimpinan' as const,
    coach_name: 'Budi Raharjo, S.Pd.',
    schedule: 'Selasa & Kamis (15:30 - 17:30)',
    room: 'Lapangan Upacara',
    total_members: 42
  },
  {
    id: 'ex_03',
    name: 'Palang Merah Remaja (PMR Wira)',
    category: 'Kepemimpinan' as const,
    coach_name: 'Dewi Anggraini, S.Pd.',
    schedule: 'Senin (15:30 - 17:00)',
    room: 'Ruang UKS Utama',
    total_members: 34
  },
  {
    id: 'ex_04',
    name: 'Klub Debat Bahasa Inggris & Toastmasters',
    category: 'Seni & Budaya' as const,
    coach_name: 'Sarah Millicent, M.Ed.',
    schedule: 'Kamis (15:30 - 17:00)',
    room: 'Lab Bahasa',
    total_members: 22
  },
  {
    id: 'ex_05',
    name: 'Basket Putra & Putri',
    category: 'Olahraga' as const,
    coach_name: 'Coach Rian Perkasa',
    schedule: 'Selasa & Sabtu (16:00 - 18:00)',
    room: 'GOR Indoor Edutera',
    total_members: 38
  }
];

export const INITIAL_PROMOTIONS = [
  {
    student_id: 'std_01',
    student_name: 'Dimas Arya Pratama',
    current_class: 'XI MIPA 1',
    target_class: 'XII MIPA 1',
    status: 'Naik Kelas' as const,
    notes: 'Rata-rata 88, tuntas semua KKM kurikulum merdeka'
  },
  {
    student_id: 'std_02',
    student_name: 'Siti Nurhaliza Putri',
    current_class: 'XI MIPA 1',
    target_class: 'XII MIPA 1',
    status: 'Naik Kelas' as const,
    notes: 'Peringkat 1 kelas, capaian istimewa'
  },
  {
    student_id: 'std_03',
    student_name: 'Budi Santoso',
    current_class: 'XI MIPA 1',
    target_class: 'XII MIPA 2',
    status: 'Naik Kelas' as const,
    notes: 'Naik kelas dengan rekomendasi bimbingan fisika'
  },
  {
    student_id: 'std_04',
    student_name: 'Amanda Putri Maharani',
    current_class: 'XI MIPA 1',
    target_class: 'XII MIPA 1',
    status: 'Naik Kelas' as const,
    notes: 'Rata-rata 90, kepribadian sangat baik'
  },
  {
    student_id: 'std_05',
    student_name: 'Rizky Ramadhan',
    current_class: 'XI MIPA 1',
    target_class: 'XI MIPA 1',
    status: 'Tinggal Kelas' as const,
    notes: 'Perlu remidial intensif pada 3 mata pelajaran peminatan'
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'log_01',
    timestamp: '22 Okt 2026, 15:42 WIB',
    user_name: 'Sri Wahyuni, S.E. (Bendahara)',
    role: 'keuangan',
    action: 'VERIFIKASI_PEMBAYARAN_MIDTRANS',
    entity: 'Invoice INV-2026-100102029',
    details: 'Pembayaran SPP Rp 350.000 via QRIS Midtrans terverifikasi settlement',
    ip_address: '182.253.12.98'
  },
  {
    id: 'log_02',
    timestamp: '22 Okt 2026, 14:15 WIB',
    user_name: 'Hendra Wijaya, S.Pd. (Wali Kelas)',
    role: 'wali_kelas',
    action: 'PERSETUJUAN_IZIN_SISWA',
    entity: 'Izin Sakit - Rizky Ramadhan',
    details: 'Menyetujui pengajuan izin istirahat dokter periode 21-22 Okt 2026',
    ip_address: '180.252.19.45'
  },
  {
    id: 'log_03',
    timestamp: '22 Okt 2026, 10:30 WIB',
    user_name: 'Ratna Sari Dewi, M.Pd. (Guru)',
    role: 'guru',
    action: 'PENGISIAN_JURNAL_KBM',
    entity: 'Jurnal MTK-W XI MIPA 1',
    details: 'Materi Turunan Fungsi Aljabar dan Aplikasi Garis Singgung kurva',
    ip_address: '10.20.1.88'
  },
  {
    id: 'log_04',
    timestamp: '21 Okt 2026, 16:00 WIB',
    user_name: 'Bambang Kusuma, M.M. (Admin)',
    role: 'admin',
    action: 'PENERBITAN_TAGIHAN_MASSAL',
    entity: 'Invoice Batch SPP Nov 2026',
    details: 'Penerbitan tagihan SPP serentak kelas X, XI, dan XII (1.248 siswa)',
    ip_address: '10.20.1.2'
  }
];

