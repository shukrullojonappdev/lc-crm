import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Worker } from '../api/worker';

@Injectable({
  providedIn: 'root'
})
export class WorkersService {
  constructor(private http: HttpClient) {}

  getCourses(page: number | 1) {
    return this.http.get<{
      count: number;
      next: string;
      previous: string;
      results: Worker[];
    }>(`${environment.apiUrl}/api/worker?page=${page}`);
  }

  getCourse(id: string) {
    return this.http.get<Worker>(`${environment.apiUrl}/api/worker/${id}`);
  }

  createCourse(worker: Worker) {
    return this.http.post<Worker>(`${environment.apiUrl}/api/worker/`, worker);
  }

  updateCourse(worker: Worker) {
    return this.http.put<Worker>(
      `${environment.apiUrl}/api/worker/${worker.id}/`,
      worker
    );
  }

  deleteCourse(id: string) {
    return this.http.delete(`${environment.apiUrl}/api/worker/${id}`);
  }
}
