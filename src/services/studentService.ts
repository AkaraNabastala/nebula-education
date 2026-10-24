import { Student } from '../types';
import { INITIAL_STUDENTS } from '../data/mockData';
import { safeGetStorage, safeSetStorage } from '../utils/storage';

/**
 * Student Service - Encapsulates student data access & operations
 * Single Source of Truth for Student domain
 * In production, these methods call NestJS REST endpoints (e.g. GET/POST /api/v1/students)
 */
class StudentService {
  private storageKey = 'edutera_students';

  getStudents(): Student[] {
    return safeGetStorage<Student[]>(this.storageKey, INITIAL_STUDENTS);
  }

  saveStudents(students: Student[]): void {
    safeSetStorage(this.storageKey, students);
  }

  addStudent(studentData: Omit<Student, 'id'>): Student {
    const students = this.getStudents();
    const newStudent: Student = {
      ...studentData,
      id: `std_${Date.now()}`
    };
    const updated = [newStudent, ...students];
    this.saveStudents(updated);
    return newStudent;
  }

  updateStudentStatus(studentId: string, status: Student['status']): Student | null {
    const students = this.getStudents();
    const target = students.find(s => s.id === studentId);
    if (!target) return null;

    target.status = status;
    this.saveStudents(students);
    return target;
  }
}

export const studentService = new StudentService();
