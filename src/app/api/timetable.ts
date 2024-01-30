export interface Timetable {
  id: string | null;
  start_time: string;
  end_time: string;
  room: number;
  type: number;
  descriptions: string;
}
