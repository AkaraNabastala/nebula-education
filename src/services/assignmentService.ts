import { UserAssignment, JabatanType } from '../types';
import { INITIAL_ASSIGNMENTS } from '../data/mockData';

/**
 * Assignment Service - Manages scoped roles/responsibilities (Jabatan)
 * Ensures separation between user identity (User), base category, and scoped assignments.
 */
class AssignmentService {
  private storageKey = 'edutera_assignments';

  getAssignments(): UserAssignment[] {
    const saved = localStorage.getItem(this.storageKey);
    return saved ? JSON.parse(saved) : INITIAL_ASSIGNMENTS;
  }

  saveAssignments(assignments: UserAssignment[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(assignments));
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

  getUserActivePermissions(userId: string): string[] {
    const assignments = this.getAssignments().filter(a => a.user_id === userId && a.is_active);
    const perms = new Set<string>();
    assignments.forEach(a => a.permissions.forEach(p => perms.add(p)));
    return Array.from(perms);
  }
}

export const assignmentService = new AssignmentService();
