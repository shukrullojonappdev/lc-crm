import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Student } from '../api/student';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  constructor(private http: HttpClient) {}

  getStudents(page: number | 1) {
    return this.http.get<{
      count: number;
      next: string;
      previous: string;
      results: Student[];
    }>(`${environment.apiUrl}/api/student?page=${page}`);
  }

  getStudent(id: string) {
    return this.http.get<Student>(`${environment.apiUrl}/api/student/${id}`);
  }

  createStudent(student: Student) {
    return this.http.post<Student>(
      `${environment.apiUrl}/api/student/`,
      student
    );
  }

  updateStudent(student: Student) {
    return this.http.patch<Student>(
      `${environment.apiUrl}/api/student/${student.id}/`,
      student
    );
  }

  deleteStudent(id: string) {
    return this.http.delete(`${environment.apiUrl}/api/student/${id}`);
  }
}
