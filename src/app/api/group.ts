import { Topic } from './topic';

export interface Group {
  id: string | null;
  title: string;
  course: number;
  teacher: number[] | null;
  table: number[] | null;
  start_date: string;
  end_date: string;
  price: number | null;
  descriptions: string | null;
}

export interface GroupHome {
  id: string | null;
  group: string | Group;
  topic: string | Topic;
  is_active: boolean;
  descriptions: string;
}
