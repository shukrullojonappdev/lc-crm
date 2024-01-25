import { Group } from './group';
import { Student } from './student';

export interface Attendance {
  id: string | null;
  level: string | AttendanceLevel;
  student: string | Student;
  group: string | Group;
  created: Date | null;
}

export interface AttendanceLevel {
  id: string | null;
  title: string;
  descriptions: string;
}
