import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../api/course';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  getCourses(page: number | 1) {
    return this.http.get<{
      count: number;
      next: string;
      previous: string;
      results: Course[];
    }>(`${environment.apiUrl}/api/courses/?page=${page}`);
  }
}
