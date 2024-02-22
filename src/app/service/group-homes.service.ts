import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GroupHome } from '../api/group';

@Injectable({
  providedIn: 'root'
})
export class GroupHomesService {
  constructor(private http: HttpClient) {}

  getGroupHomes(page: number | 1) {
    return this.http.get<{
      count: number;
      next: string;
      previous: string;
      results: GroupHome[];
    }>(`${environment.apiUrl}/api/groupHome?page=${page}`);
  }

  getGroupHome(id: string) {
    return this.http.get<GroupHome>(
      `${environment.apiUrl}/api/groupHome/${id}`
    );
  }

  createGroupHome(groupHome: GroupHome) {
    return this.http.post<GroupHome>(
      `${environment.apiUrl}/api/groupHome/`,
      groupHome
    );
  }

  getGHomeworksByGroup(id: string) {
    return this.http.get(`${environment.apiUrl}/api/group_hw_get/`);
  }

  updateGroupHome(groupHome: GroupHome) {
    return this.http.put<GroupHome>(
      `${environment.apiUrl}/api/groupHome/${groupHome.id}/`,
      groupHome
    );
  }

  deleteGroupHome(id: string) {
    return this.http.delete(`${environment.apiUrl}/api/groupHome/${id}`);
  }
}
