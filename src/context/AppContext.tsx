import React, { createContext, useContext, useState } from 'react';
import {
  Role,
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
  ThemeMode,
  UserAssignment,
  UserCategory,
  JabatanType
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_TEACHERS,
  INITIAL_CLASSES,
  INITIAL_SUBJECTS,
  INITIAL_JOURNALS,
  INITIAL_ASSESSMENT,
  INITIAL_LEAVES,
  INITIAL_SCHEDULE,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_EXTRACURRICULARS,
  INITIAL_PROMOTIONS,
  INITIAL_AUDIT_LOGS
} from '../data/mockData';
import { studentService } from '../services/studentService';
import { financeService } from '../services/financeService';
import { assignmentService } from '../services/assignmentService';
import { safeGetStorage, safeSetStorage } from '../utils/storage';

interface AppContextType {
  role: Role;
  setRole: (role: Role) => void;
  currentUser: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  themeMode: ThemeMode;
  setThemeMode: (theme: ThemeMode) => void;
  
  // Data (Managed via dedicated domain services)
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  teachers: Teacher[];
  classes: ClassRoom[];
  subjects: Subject[];
  invoices: Invoice[];
  journals: TeachingJournal[];
  assessment: AssessmentSubject;
  leaves: StudentLeaveRequest[];
  schedule: ScheduleItem[];
  announcements: Announcement[];
  extracurriculars: any[];
  promotions: any[];
  auditLogs: any[];
  executePromotion: (method: 'fixed' | 'randomized') => void;
  isSidebarExpanded: boolean;
  setIsSidebarExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  assignments: UserAssignment[];
  assignJabatan: (data: Omit<UserAssignment, 'id' | 'assigned_at'>) => void;
  revokeJabatan: (assignmentId: string) => void;
  toggleAssignmentStatus: (assignmentId: string) => void;

  // Actions
  payInvoiceWithMidtrans: (invoiceId: string, method: string) => void;
  payInvoiceCash: (invoiceId: string) => void;
  addJournal: (journal: Omit<TeachingJournal, 'id'>) => void;
  updateScore: (studentId: string, tugas1: number, tugas2: number, uts: number, uas: number, notes: string) => void;
  approveLeave: (leaveId: string, notes: string) => void;
  rejectLeave: (leaveId: string, notes: string) => void;
  submitLeave: (leave: Omit<StudentLeaveRequest, 'id' | 'status'>) => void;
  addNewStudent: (student: Omit<Student, 'id'>) => void;
  addNewInvoice: (invoice: Omit<Invoice, 'id' | 'invoice_no'>) => void;

  // Modals & triggers
  activeMidtransInvoice: Invoice | null;
  setActiveMidtransInvoice: (inv: Invoice | null) => void;
  activeReceiptInvoice: Invoice | null;
  setActiveReceiptInvoice: (inv: Invoice | null) => void;
  activeRaporStudent: Student | null;
  setActiveRaporStudent: (std: Student | null) => void;

  // Notification / Toast
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  searchTerm: string;
  setSearchTerm: (s: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<Role>(() => {
    return safeGetStorage<Role>('edutera_role', 'admin');
  });

  const [activeTab, setActiveTab] = useState<string>('overview');
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    return safeGetStorage<ThemeMode>('edutera_theme', 'edutera');
  });

  const [searchTerm, setSearchTerm] = useState('');

  // Domain service-backed state (Single Source of Truth)
  const [students, setStudents] = useState<Student[]>(() => studentService.getStudents());
  const [invoices, setInvoices] = useState<Invoice[]>(() => financeService.getInvoices());
  const [assignments, setAssignments] = useState<UserAssignment[]>(() => assignmentService.getAssignments());

  const [teachers] = useState<Teacher[]>(INITIAL_TEACHERS);
  const [classes] = useState<ClassRoom[]>(INITIAL_CLASSES);
  const [subjects] = useState<Subject[]>(INITIAL_SUBJECTS);

  const [journals, setJournals] = useState<TeachingJournal[]>(() => {
    return safeGetStorage<TeachingJournal[]>('edutera_journals', INITIAL_JOURNALS);
  });

  const [assessment, setAssessment] = useState<AssessmentSubject>(() => {
    return safeGetStorage<AssessmentSubject>('edutera_assessment', INITIAL_ASSESSMENT);
  });

  const [leaves, setLeaves] = useState<StudentLeaveRequest[]>(() => {
    return safeGetStorage<StudentLeaveRequest[]>('edutera_leaves', INITIAL_LEAVES);
  });

  const [schedule] = useState<ScheduleItem[]>(INITIAL_SCHEDULE);
  const [announcements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [extracurriculars] = useState(INITIAL_EXTRACURRICULARS);
  const [promotions, setPromotions] = useState(INITIAL_PROMOTIONS);
  const [auditLogs] = useState(INITIAL_AUDIT_LOGS);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(() => {
    return typeof window !== 'undefined' && window.innerWidth >= 1024;
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const executePromotion = (method: 'fixed' | 'randomized') => {
    if (method === 'randomized') {
      const targetClasses = ['XII MIPA 1', 'XII MIPA 2', 'XII IPS 1'];
      setPromotions(prev =>
        prev.map((p, idx) => ({
          ...p,
          target_class: p.status === 'Naik Kelas' ? targetClasses[idx % targetClasses.length] : p.current_class
        }))
      );
      showToast('Kenaikan kelas dengan algoritma rotasi & acak rombel berhasil disimulasikan!', 'success');
    } else {
      setPromotions(prev =>
        prev.map(p => ({
          ...p,
          target_class: p.status === 'Naik Kelas' ? 'XII MIPA 1' : p.current_class
        }))
      );
      showToast('Kenaikan kelas metode kelompok tetap (kohesif) berhasil disahkan!', 'success');
    }
  };

  // Modals
  const [activeMidtransInvoice, setActiveMidtransInvoice] = useState<Invoice | null>(null);
  const [activeReceiptInvoice, setActiveReceiptInvoice] = useState<Invoice | null>(null);
  const [activeRaporStudent, setActiveRaporStudent] = useState<Student | null>(null);

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    safeSetStorage('edutera_role', newRole);
    showToast(`Beralih peran menjadi: ${INITIAL_USERS[newRole]?.title || newRole}`, 'info');
  };

  const setThemeMode = (newTheme: ThemeMode) => {
    setThemeModeState(newTheme);
    safeSetStorage('edutera_theme', newTheme);
    showToast(`Tema diubah ke: ${newTheme === 'edutera' ? 'Edutera Neo Ice-Blue' : 'Crowz Warm Terracotta'}`, 'info');
  };

  // Resolve current active user and their effective permissions
  const baseUser = INITIAL_USERS[role] || INITIAL_USERS.admin;
  const userValidAssignments = assignmentService.getUserValidAssignments(baseUser.id);
  const effectivePermissions = assignmentService.resolveEffectivePermissions(
    baseUser.user_category,
    userValidAssignments
  );

  const currentUser: User = {
    ...baseUser,
    assignments: userValidAssignments,
    effective_permissions: effectivePermissions
  };

  // ==========================================
  // JABATAN / ASSIGNMENT ACTIONS (Via assignmentService)
  // ==========================================
  const assignJabatan = (data: Omit<UserAssignment, 'id' | 'assigned_at'>) => {
    const newAsg = assignmentService.assignJabatan(data);
    setAssignments(assignmentService.getAssignments());
    showToast(`Jabatan ${newAsg.jabatan_title} berhasil diberikan kepada ${newAsg.user_name}!`, 'success');
  };

  const revokeJabatan = (assignmentId: string) => {
    assignmentService.revokeJabatan(assignmentId);
    setAssignments(assignmentService.getAssignments());
    showToast('Penugasan jabatan berhasil dicabut dari akun pengguna.', 'info');
  };

  const toggleAssignmentStatus = (assignmentId: string) => {
    assignmentService.toggleActive(assignmentId);
    setAssignments(assignmentService.getAssignments());
    showToast('Status keaktifan penugasan berhasil diperbarui.', 'success');
  };

  // ==========================================
  // FINANCE ACTIONS (Via financeService)
  // ==========================================
  const payInvoiceWithMidtrans = (invoiceId: string, method: string) => {
    const updated = financeService.simulateDemoPayment(invoiceId, method);
    if (updated) {
      setInvoices(financeService.getInvoices());
      showToast('Pembayaran Midtrans Berhasil Diselesaikan (Simulasi Demo)!', 'success');
    }
  };

  const payInvoiceCash = (invoiceId: string) => {
    const updated = financeService.recordCashPayment(invoiceId, currentUser.name);
    if (updated) {
      setInvoices(financeService.getInvoices());
      showToast('Pembayaran Tunai berhasil dicatat oleh Petugas Keuangan!', 'success');
    }
  };

  const addNewInvoice = (invData: Omit<Invoice, 'id' | 'invoice_no'>) => {
    const result = financeService.createInvoice(invData);
    if (result.success && result.invoice) {
      setInvoices(financeService.getInvoices());
      showToast(`Tagihan baru berhasil diterbitkan untuk ${result.invoice.student_name}!`, 'success');
    } else {
      showToast(result.error || 'Gagal menerbitkan tagihan.', 'error');
    }
  };

  // ==========================================
  // STUDENT ACTIONS (Via studentService)
  // ==========================================
  const addNewStudent = (studentData: Omit<Student, 'id'>) => {
    const newStudent = studentService.addStudent(studentData);
    setStudents(studentService.getStudents());
    showToast(`Siswa baru ${newStudent.name} berhasil ditambahkan ke Data Induk!`, 'success');
  };

  // ==========================================
  // ACADEMIC & LEAVE ACTIONS
  // ==========================================
  const addJournal = (journal: Omit<TeachingJournal, 'id'>) => {
    const newJournal: TeachingJournal = {
      ...journal,
      id: `jrn_${Date.now()}`
    };
    const updated = [newJournal, ...journals];
    setJournals(updated);
    safeSetStorage('edutera_journals', updated);
    showToast('Jurnal Pembelajaran berhasil disimpan ke sistem!', 'success');
  };

  const updateScore = (studentId: string, tugas1: number, tugas2: number, uts: number, uas: number, notes: string) => {
    const updatedScores = assessment.scores.map(sc => {
      if (sc.student_id === studentId) {
        const final_score = Math.round((tugas1 * 0.2) + (tugas2 * 0.2) + (uts * 0.3) + (uas * 0.3));
        let predicate: 'A' | 'B' | 'C' | 'D' = 'D';
        if (final_score >= 88) predicate = 'A';
        else if (final_score >= 78) predicate = 'B';
        else if (final_score >= 68) predicate = 'C';

        return {
          ...sc,
          tugas1,
          tugas2,
          uts,
          uas,
          final_score,
          predicate,
          notes
        };
      }
      return sc;
    });

    const newAssessment = { ...assessment, scores: updatedScores };
    setAssessment(newAssessment);
    safeSetStorage('edutera_assessment', newAssessment);
    showToast('Nilai asesmen siswa berhasil diperbarui!', 'success');
  };

  const approveLeave = (leaveId: string, notes: string) => {
    const reviewer = currentUser.name;
    const now = new Date().toLocaleString('id-ID');
    const updated = leaves.map(lev => {
      if (lev.id === leaveId) {
        return {
          ...lev,
          status: 'Disetujui' as const,
          reviewed_by: reviewer,
          reviewed_at: `${now} WIB`,
          review_notes: notes || 'Permohonan izin disetujui oleh Wali Kelas.'
        };
      }
      return lev;
    });
    setLeaves(updated);
    safeSetStorage('edutera_leaves', updated);
    showToast('Pengajuan izin siswa telah DISETUJUI & disinkronkan ke rekap presensi.', 'success');
  };

  const rejectLeave = (leaveId: string, notes: string) => {
    const reviewer = currentUser.name;
    const now = new Date().toLocaleString('id-ID');
    const updated = leaves.map(lev => {
      if (lev.id === leaveId) {
        return {
          ...lev,
          status: 'Ditolak' as const,
          reviewed_by: reviewer,
          reviewed_at: `${now} WIB`,
          review_notes: notes || 'Permohonan izin belum memenuhi kelengkapan dokumen.'
        };
      }
      return lev;
    });
    setLeaves(updated);
    safeSetStorage('edutera_leaves', updated);
    showToast('Pengajuan izin telah ditolak dengan catatan alasan.', 'info');
  };

  const submitLeave = (leaveData: Omit<StudentLeaveRequest, 'id' | 'status'>) => {
    const newLeave: StudentLeaveRequest = {
      ...leaveData,
      id: `lev_${Date.now()}`,
      status: 'Menunggu Verifikasi'
    };
    const updated = [newLeave, ...leaves];
    setLeaves(updated);
    safeSetStorage('edutera_leaves', updated);
    showToast('Pengajuan izin berhasil dikirim ke Wali Kelas untuk ditinjau.', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        currentUser,
        activeTab,
        setActiveTab,
        themeMode,
        setThemeMode,
        students,
        setStudents,
        teachers,
        classes,
        subjects,
        invoices,
        journals,
        assessment,
        leaves,
        schedule,
        announcements,
        extracurriculars,
        promotions,
        auditLogs,
        executePromotion,
        isSidebarExpanded,
        setIsSidebarExpanded,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        assignments,
        assignJabatan,
        revokeJabatan,
        toggleAssignmentStatus,
        payInvoiceWithMidtrans,
        payInvoiceCash,
        addJournal,
        updateScore,
        approveLeave,
        rejectLeave,
        submitLeave,
        addNewStudent,
        addNewInvoice,
        activeMidtransInvoice,
        setActiveMidtransInvoice,
        activeReceiptInvoice,
        setActiveReceiptInvoice,
        activeRaporStudent,
        setActiveRaporStudent,
        toast,
        showToast,
        searchTerm,
        setSearchTerm
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
