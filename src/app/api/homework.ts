import { GroupHome } from './group';
import { Student } from './student';

export interface Homework {
  id: string | null;
  groupHomeWork: string | GroupHome;
  price: string;
  student: string | Student;
  link: string;
  is_active: boolean;
  descriptions: string;
}
