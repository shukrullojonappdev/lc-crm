import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Homework } from '../api/homework';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeworksService {
  constructor(private http: HttpClient) {}

  getHomeworks(page: number | 1) {
    return this.http.get<{
      count: number;
      next: string;
      previous: string;
      results: Homework[];
    }>(`${environment.apiUrl}/api/homeWork?page=${page}`);
  }

  getHomework(id: string) {
    return this.http.get<Homework>(`${environment.apiUrl}/api/homeWork/${id}`);
  }

  createHomework(homeWork: Homework) {
    return this.http.post<Homework>(
      `${environment.apiUrl}/api/homeWork/`,
      homeWork
    );
  }

  updateHomework(homeWork: Homework) {
    return this.http.put<Homework>(
      `${environment.apiUrl}/api/homeWork/${homeWork.id}/`,
      homeWork
    );
  }

  deleteHomework(id: string) {
    return this.http.delete(`${environment.apiUrl}/api/homeWork/${id}`);
  }
}
