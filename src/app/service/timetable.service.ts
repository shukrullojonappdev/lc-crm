import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Timetable } from '../api/timetable';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {
  constructor(private http: HttpClient) {}

  getTimetables(page: number | 1) {
    return this.http.get<{
      count: number;
      next: string;
      previous: string;
      results: Timetable[];
    }>(`${environment.apiUrl}/api/table?page=${page}`);
  }

  getTimetable(id: string) {
    return this.http.get<Timetable>(`${environment.apiUrl}/api/table/${id}`);
  }

  createTimetable(table: Timetable) {
    return this.http.post<Timetable>(`${environment.apiUrl}/api/table/`, table);
  }

  updateTimetable(table: Timetable) {
    return this.http.put<Timetable>(
      `${environment.apiUrl}/api/table/${table.id}/`,
      table
    );
  }

  deleteTimetable(id: string) {
    return this.http.delete(`${environment.apiUrl}/api/table/${id}`);
  }
}
