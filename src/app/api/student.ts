import { Course } from './course';
import { Group } from './group';
import { User } from './user';

export interface Student {
  id: string | null;
  user: string | User;
  group: string | Group;
  git_username: string | null;
  git_token: string | null;
  course: string | Course;
  is_line: boolean;
  descriptions: string;
}
