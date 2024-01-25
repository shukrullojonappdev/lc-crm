import { Course } from './course';

export interface Topic {
  id: string | null;
  title: string;
  course: string | Course;
  descriptions: string;
}
