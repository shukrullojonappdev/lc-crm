import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Topic } from '../api/topic';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {
  constructor(private http: HttpClient) {}

  getTopics(page: number | 1) {
    return this.http.get<{
      count: number;
      next: string;
      previous: string;
      results: Topic[];
    }>(`${environment.apiUrl}/api/topic?page=${page}`);
  }

  getTopic(id: string) {
    return this.http.get<Topic>(`${environment.apiUrl}/api/topic/${id}`);
  }

  createTopic(topic: Topic) {
    return this.http.post<Topic>(`${environment.apiUrl}/api/topic/`, topic);
  }

  updateTopic(topic: Topic) {
    return this.http.put<Topic>(
      `${environment.apiUrl}/api/topic/${topic.id}/`,
      topic
    );
  }

  deleteTopic(id: string) {
    return this.http.delete(`${environment.apiUrl}/api/topic/${id}`);
  }
}
