import { Injectable } from '@angular/core';
import { Group } from '../api/group';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  constructor(private http: HttpClient) {}

  getGroups(page: number | 1) {
    return this.http.get<{
      count: number;
      next: string;
      previous: string;
      results: Group[];
    }>(`${environment.apiUrl}/api/group?page=${page}`);
  }

  getGroup(id: string) {
    return this.http.get<Group>(`${environment.apiUrl}/api/group/${id}`);
  }

  createGroup(group: Group) {
    return this.http.post<Group>(`${environment.apiUrl}/api/group/`, group);
  }

  updateGroup(group: Group) {
    return this.http.put<Group>(
      `${environment.apiUrl}/api/group/${group.id}/`,
      group
    );
  }

  deleteGroup(id: string) {
    return this.http.delete(`${environment.apiUrl}/api/group/${id}`);
  }
}
