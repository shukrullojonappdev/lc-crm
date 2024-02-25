import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Attendance } from '../api/attendance';

@Injectable({
  providedIn: 'root'
})
export class AttendancesService {
  constructor(private http: HttpClient) {}

  getAttendances(page: number | 1) {
    return this.http.get<{
      count: number;
      next: string;
      previous: string;
      results: Attendance[];
    }>(`${environment.apiUrl}/api/attendance?page=${page}`);
  }

  getAttendanceLevels(page: number | 1) {
    return this.http.get<{
      count: number;
      next: string;
      previous: string;
      results: any[];
    }>(`${environment.apiUrl}/api/attendanceLevel?page=${page}`);
  }

  getAttendance(id: string) {
    return this.http.get<Attendance>(
      `${environment.apiUrl}/api/attendance/${id}`
    );
  }

  createAttendance(attendance: Attendance) {
    return this.http.post<Attendance>(
      `${environment.apiUrl}/api/attendance/`,
      attendance
    );
  }

  updateAttendance(attendance: Attendance) {
    return this.http.put<Attendance>(
      `${environment.apiUrl}/api/attendance/${attendance.id}/`,
      attendance
    );
  }

  deleteAttendance(id: string) {
    return this.http.delete(`${environment.apiUrl}/api/attendance/${id}`);
  }
}
