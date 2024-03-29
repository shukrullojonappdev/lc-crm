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
    }>(`${environment.apiUrl}/api/course?page=${page}`);
  }

  getCourse(id: string) {
    return this.http.get<Course>(`${environment.apiUrl}/api/course/${id}`);
  }

  createCourse(course: Course) {
    return this.http.post<Course>(`${environment.apiUrl}/api/course/`, course);
  }

  updateCourse(course: Course) {
    return this.http.put<Course>(
      `${environment.apiUrl}/api/course/${course.id}/`,
      course
    );
  }

  deleteCourse(id: string) {
    return this.http.delete(`${environment.apiUrl}/api/course/${id}`);
  }
}
