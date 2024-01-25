import { Course } from './course';
import { Department } from './department';
import { User } from './user';

export interface Teacher {
  id: string | null;
  department: string | Department;
  user: string | User;
  course: string | Course;
  descriptions: string;
}
