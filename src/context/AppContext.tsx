import React, { createContext, useContext, useState, useEffect } from 'react';
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
  INITIAL_ASSIGNMENTS,
  INITIAL_STUDENTS,
  INITIAL_TEACHERS,
  INITIAL_CLASSES,
  INITIAL_SUBJECTS,
  INITIAL_INVOICES,
  INITIAL_JOURNALS,
  INITIAL_ASSESSMENT,
  INITIAL_LEAVES,
  INITIAL_SCHEDULE,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_EXTRACURRICULARS,
  INITIAL_PROMOTIONS,
  INITIAL_AUDIT_LOGS
} from '../data/mockData';

interface AppContextType {
  role: Role;
  setRole: (role: Role) => void;
  currentUser: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  themeMode: ThemeMode;
  setThemeMode: (theme: ThemeMode) => void;
  
  // Data
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
    const saved = localStorage.getItem('edutera_role');
    return (saved as Role) || 'admin';
  });

  const [activeTab, setActiveTab] = useState<string>('overview');
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('edutera_theme');
    return (saved as ThemeMode) || 'edutera';
  });

  const [searchTerm, setSearchTerm] = useState('');

  // Local state initialized from mock data or local storage
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('edutera_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [teachers] = useState<Teacher[]>(INITIAL_TEACHERS);
  const [classes] = useState<ClassRoom[]>(INITIAL_CLASSES);
  const [subjects] = useState<Subject[]>(INITIAL_SUBJECTS);

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem('edutera_invoices');
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });

  const [journals, setJournals] = useState<TeachingJournal[]>(() => {
    const saved = localStorage.getItem('edutera_journals');
    return saved ? JSON.parse(saved) : INITIAL_JOURNALS;
  });

  const [assessment, setAssessment] = useState<AssessmentSubject>(() => {
    const saved = localStorage.getItem('edutera_assessment');
    return saved ? JSON.parse(saved) : INITIAL_ASSESSMENT;
  });

  const [leaves, setLeaves] = useState<StudentLeaveRequest[]>(() => {
    const saved = localStorage.getItem('edutera_leaves');
    return saved ? JSON.parse(saved) : INITIAL_LEAVES;
  });

  const [schedule] = useState<ScheduleItem[]>(INITIAL_SCHEDULE);
  const [announcements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [extracurriculars, setExtracurriculars] = useState(INITIAL_EXTRACURRICULARS);
  const [promotions, setPromotions] = useState(INITIAL_PROMOTIONS);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(() => {
    return window.innerWidth >= 1024; // Default expanded on desktop
  });

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
    }, 4000);
  };

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    localStorage.setItem('edutera_role', newRole);
    showToast(`Beralih peran menjadi: ${INITIAL_USERS[newRole]?.title || newRole}`, 'info');
  };

  const setThemeMode = (newTheme: ThemeMode) => {
    setThemeModeState(newTheme);
    localStorage.setItem('edutera_theme', newTheme);
    showToast(`Tema diubah ke: ${newTheme === 'edutera' ? 'Edutera Neo Ice-Blue' : 'Crowz Warm Terracotta'}`, 'info');
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('edutera_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('edutera_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('edutera_journals', JSON.stringify(journals));
  }, [journals]);

  useEffect(() => {
    localStorage.setItem('edutera_assessment', JSON.stringify(assessment));
  }, [assessment]);

  useEffect(() => {
    localStorage.setItem('edutera_leaves', JSON.stringify(leaves));
  }, [leaves]);

  const [assignments, setAssignments] = useState<UserAssignment[]>(() => {
    const saved = localStorage.getItem('edutera_assignments');
    return saved ? JSON.parse(saved) : INITIAL_ASSIGNMENTS;
  });

  useEffect(() => {
    localStorage.setItem('edutera_assignments', JSON.stringify(assignments));
  }, [assignments]);

  const baseUser = INITIAL_USERS[role] || INITIAL_USERS.admin;
  const userActiveAssignments = assignments.filter(
    a => a.user_id === baseUser.id && a.is_active
  );

  const currentUser: User = {
    ...baseUser,
    assignments: userActiveAssignments
  };

  const assignJabatan = (data: Omit<UserAssignment, 'id' | 'assigned_at'>) => {
    const now = new Date().toISOString().split('T')[0];
    const newAsg: UserAssignment = {
      ...data,
      id: `asg_${Date.now()}`,
      assigned_at: now
    };
    setAssignments(prev => [newAsg, ...prev]);
    showToast(`Jabatan ${newAsg.jabatan_title} berhasil diberikan kepada ${newAsg.user_name}!`, 'success');
  };

  const revokeJabatan = (assignmentId: string) => {
    setAssignments(prev => prev.filter(a => a.id !== assignmentId));
    showToast('Penugasan jabatan berhasil dicabut dari akun pengguna.', 'info');
  };

  const toggleAssignmentStatus = (assignmentId: string) => {
    setAssignments(prev =>
      prev.map(a => (a.id === assignmentId ? { ...a, is_active: !a.is_active } : a))
    );
    showToast('Status keaktifan penugasan berhasil diperbarui.', 'success');
  };

  const payInvoiceWithMidtrans = (invoiceId: string, method: string) => {
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}, ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`;
    
    setInvoices(prev =>
      prev.map(inv => {
        if (inv.id === invoiceId) {
          return {
            ...inv,
            status: 'paid',
            amount_paid: inv.amount,
            payment_method: method,
            paid_at: formattedDate
          };
        }
        return inv;
      })
    );

    // Also update student payment status if this was their only bill
    const paidInv = invoices.find(i => i.id === invoiceId);
    if (paidInv) {
      setStudents(prev =>
        prev.map(std => {
          if (std.id === paidInv.student_id) {
            return { ...std, payment_status: 'Lunas' };
          }
          return std;
        })
      );
    }

    showToast('Pembayaran Midtrans Berhasil Diselesaikan (Settlement Webhook Terverifikasi)!', 'success');
  };

  const payInvoiceCash = (invoiceId: string) => {
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}, ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`;

    setInvoices(prev =>
      prev.map(inv => {
        if (inv.id === invoiceId) {
          return {
            ...inv,
            status: 'paid',
            amount_paid: inv.amount,
            payment_method: 'Kasir Tata Usaha (Tunai)',
            paid_at: formattedDate
          };
        }
        return inv;
      })
    );
    showToast('Pembayaran Tunai berhasil dicatat oleh Petugas Keuangan!', 'success');
  };

  const addJournal = (journal: Omit<TeachingJournal, 'id'>) => {
    const newJournal: TeachingJournal = {
      ...journal,
      id: `jrn_${Date.now()}`
    };
    setJournals(prev => [newJournal, ...prev]);
    showToast('Jurnal Pembelajaran berhasil disimpan ke sistem!', 'success');
  };

  const updateScore = (studentId: string, tugas1: number, tugas2: number, uts: number, uas: number, notes: string) => {
    const finalScore = Math.round((tugas1 * 0.2) + (tugas2 * 0.2) + (uts * 0.3) + (uas * 0.3));
    let predicate: 'A' | 'B' | 'C' | 'D' = 'D';
    if (finalScore >= 88) predicate = 'A';
    else if (finalScore >= 78) predicate = 'B';
    else if (finalScore >= 68) predicate = 'C';

    setAssessment(prev => ({
      ...prev,
      scores: prev.scores.map(s => {
        if (s.student_id === studentId) {
          return {
            ...s,
            tugas1,
            tugas2,
            uts,
            uas,
            final_score: finalScore,
            predicate,
            notes
          };
        }
        return s;
      })
    }));
    showToast('Nilai siswa berhasil diperbarui & nilai akhir dihitung otomatis!', 'success');
  };

  const approveLeave = (leaveId: string, notes: string) => {
    const reviewer = currentUser.name;
    const now = new Date().toLocaleString('id-ID');
    setLeaves(prev =>
      prev.map(lev => {
        if (lev.id === leaveId) {
          return {
            ...lev,
            status: 'Disetujui',
            reviewed_by: reviewer,
            reviewed_at: `${now} WIB`,
            review_notes: notes || 'Permohonan izin disetujui oleh Wali Kelas.'
          };
        }
        return lev;
      })
    );
    showToast('Pengajuan izin siswa telah DISETUJUI & disinkronkan ke rekap presensi.', 'success');
  };

  const rejectLeave = (leaveId: string, notes: string) => {
    const reviewer = currentUser.name;
    const now = new Date().toLocaleString('id-ID');
    setLeaves(prev =>
      prev.map(lev => {
        if (lev.id === leaveId) {
          return {
            ...lev,
            status: 'Ditolak',
            reviewed_by: reviewer,
            reviewed_at: `${now} WIB`,
            review_notes: notes || 'Permohonan izin belum memenuhi kelengkapan dokumen.'
          };
        }
        return lev;
      })
    );
    showToast('Pengajuan izin telah ditolak dengan catatan alasan.', 'info');
  };

  const submitLeave = (leaveData: Omit<StudentLeaveRequest, 'id' | 'status'>) => {
    const newLeave: StudentLeaveRequest = {
      ...leaveData,
      id: `lev_${Date.now()}`,
      status: 'Menunggu Verifikasi'
    };
    setLeaves(prev => [newLeave, ...prev]);
    showToast('Pengajuan izin berhasil dikirim ke Wali Kelas untuk ditinjau.', 'success');
  };

  const addNewStudent = (studentData: Omit<Student, 'id'>) => {
    const newStudent: Student = {
      ...studentData,
      id: `std_${Date.now()}`
    };
    setStudents(prev => [newStudent, ...prev]);
    showToast(`Siswa baru ${newStudent.name} berhasil ditambahkan ke Data Induk!`, 'success');
  };

  const addNewInvoice = (invData: Omit<Invoice, 'id' | 'invoice_no'>) => {
    const newInvoice: Invoice = {
      ...invData,
      id: `inv_${Date.now()}`,
      invoice_no: `INV-2026-${Math.floor(100000000 + Math.random() * 900000000)}`
    };
    setInvoices(prev => [newInvoice, ...prev]);
    showToast(`Tagihan baru berhasil diterbitkan untuk ${newInvoice.student_name}!`, 'success');
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
