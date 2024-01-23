export interface Group {
  id: string | null;
  title: string;
  course: number | null;
  teacher: number | null;
  table: number | null;
  start_date: string | null;
  end_date: string | null;
  price: number | null;
  descriptions: string | null;
}
