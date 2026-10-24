import { UserAssignment, JabatanType, UserCategory, PermissionKey, User } from '../types';
import { INITIAL_ASSIGNMENTS } from '../data/mockData';
import { safeGetStorage, safeSetStorage } from '../utils/storage';

/**
 * Default base permissions assigned to each of the 4 User Categories
 */
export const BASE_CATEGORY_PERMISSIONS: Record<UserCategory, PermissionKey[]> = {
  admin_aplikasi: [
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
  ],
  guru: [
    'RECORD_ATTENDANCE',
    'INPUT_GRADES',
    'VIEW_ALL_STUDENTS',
    'MANAGE_SCHEDULE'
  ],
  staf: [
    'VIEW_ALL_STUDENTS',
    'VIEW_FINANCE'
  ],
  siswa: [
    'VIEW_OWN_ACADEMIC',
    'PAY_TUITION'
  ]
};

/**
 * Standard permissions granted by each dynamic Jabatan / Responsibility
 */
export const JABATAN_PERMISSIONS: Record<JabatanType, PermissionKey[]> = {
  admin_kurikulum: ['MANAGE_CURRICULUM', 'MANAGE_SCHEDULE', 'VIEW_ALL_STUDENTS'],
  bendahara: ['MANAGE_FINANCE', 'VIEW_FINANCE'],
  wali_kelas: ['VERIFY_LEAVES', 'INPUT_GRADES', 'VIEW_ALL_STUDENTS'],
  pembina_ekskul: ['SUPERVISE_EKSKUL', 'VIEW_ALL_STUDENTS'],
  guru_piket: ['RECORD_ATTENDANCE', 'VIEW_ALL_STUDENTS'],
  admin_kesiswaan: ['VERIFY_LEAVES', 'VIEW_ALL_STUDENTS', 'MANAGE_STUDENTS']
};

/**
 * Assignment Service - Manages scoped roles/responsibilities (Jabatan)
 * Ensures separation between user identity (User), 4 base categories, and scoped assignments.
 */
class AssignmentService {
  private storageKey = 'edutera_assignments';

  getAssignments(): UserAssignment[] {
    return safeGetStorage<UserAssignment[]>(this.storageKey, INITIAL_ASSIGNMENTS);
  }

  saveAssignments(assignments: UserAssignment[]): void {
    safeSetStorage(this.storageKey, assignments);
  }

  /**
   * Check if a specific assignment is currently valid based on active flag and validity dates
   */
  isAssignmentValid(assignment: UserAssignment, targetDate: string = new Date().toISOString().slice(0, 10)): boolean {
    if (!assignment.is_active) return false;
    if (assignment.start_date && assignment.start_date > targetDate) return false;
    if (assignment.end_date && assignment.end_date < targetDate) return false;
    return true;
  }

  /**
   * Get all active and valid assignments for a user
   */
  getUserValidAssignments(userId: string, targetDate?: string): UserAssignment[] {
    const assignments = this.getAssignments();
    return assignments.filter(a => a.user_id === userId && this.isAssignmentValid(a, targetDate));
  }

  /**
   * Resolve complete effective permissions for a user:
   * Base Category Permissions + Valid Active Assignment Permissions
   */
  resolveEffectivePermissions(userCategory: UserCategory, assignments: UserAssignment[] = []): PermissionKey[] {
    const permissions = new Set<PermissionKey>(BASE_CATEGORY_PERMISSIONS[userCategory] || []);

    const today = new Date().toISOString().slice(0, 10);
    assignments
      .filter(a => this.isAssignmentValid(a, today))
      .forEach(a => {
        (a.permissions || []).forEach(p => permissions.add(p as PermissionKey));
      });

    return Array.from(permissions);
  }

  /**
   * Scope-aware permission check
   */
  hasPermission(
    user: Partial<User>,
    requiredPermission: PermissionKey,
    scope?: { type?: 'kelas' | 'ekskul' | 'institusi'; id?: string }
  ): boolean {
    if (!user || !user.user_category) return false;

    // Admin Aplikasi always has institution-wide access
    if (user.user_category === 'admin_aplikasi') return true;

    // Check base permissions first (these are typically institution-level or user-level)
    const basePerms = BASE_CATEGORY_PERMISSIONS[user.user_category] || [];
    if (basePerms.includes(requiredPermission) && !scope) {
      return true;
    }

    // Check active valid assignments
    const today = new Date().toISOString().slice(0, 10);
    const validAssignments = (user.assignments || []).filter(a => this.isAssignmentValid(a, today));

    for (const asg of validAssignments) {
      const grantsPerm = (asg.permissions || []).includes(requiredPermission);
      if (!grantsPerm) continue;

      // If no specific scope required, or assignment has institution scope
      if (!scope || asg.scope_type === 'institusi') {
        return true;
      }

      // If scope matches assignment scope
      if (scope.type === asg.scope_type && (!scope.id || scope.id === asg.scope_id)) {
        return true;
      }
    }

    return false;
  }

  assignJabatan(data: Omit<UserAssignment, 'id' | 'assigned_at'>): UserAssignment {
    const assignments = this.getAssignments();
    const newAssignment: UserAssignment = {
      ...data,
      id: `asg_${Date.now()}`,
      assigned_at: new Date().toISOString()
    };
    const updated = [newAssignment, ...assignments];
    this.saveAssignments(updated);
    return newAssignment;
  }

  revokeJabatan(assignmentId: string): void {
    const assignments = this.getAssignments().filter(a => a.id !== assignmentId);
    this.saveAssignments(assignments);
  }

  toggleActive(assignmentId: string): UserAssignment | null {
    const assignments = this.getAssignments();
    const target = assignments.find(a => a.id === assignmentId);
    if (!target) return null;

    target.is_active = !target.is_active;
    this.saveAssignments(assignments);
    return target;
  }
}

export const assignmentService = new AssignmentService();
