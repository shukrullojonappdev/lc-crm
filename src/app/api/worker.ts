import { Course } from './course';
import { Department } from './department';
import { User } from './user';

export interface Worker {
  id: string | null;
  user: string | User;
  department: string | Department;
  course: string | Course;
  descriptions: string;
}
