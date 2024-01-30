import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Teacher } from '../api/teacher';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  constructor(private http: HttpClient) {}

  createTeacher(payload: Teacher) {
    return this.http.post(`${environment.apiUrl}/api/teacherApi/`, payload);
  }

  getTeachers(search: string, ordering: string) {
    return this.http.get(
      `${environment.apiUrl}/api/teacherApi/?${
        search ? 'search=' + search + '&' : ''
      }${ordering ? 'ordering=' + ordering : ''}`
    );
  }
}
