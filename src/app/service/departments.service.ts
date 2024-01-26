import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Department } from '../api/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  constructor(private http: HttpClient) {}

  getDepartments(page: number | 1) {
    return this.http.get<{
      count: number;
      next: string;
      previous: string;
      results: Department[];
    }>(`${environment.apiUrl}/api/department?page=${page}`);
  }

  getDepartment(id: string) {
    return this.http.get<Department>(
      `${environment.apiUrl}/api/department/${id}`
    );
  }

  createDepartment(department: Department) {
    return this.http.post<Department>(
      `${environment.apiUrl}/api/department/`,
      department
    );
  }

  updateDepartment(department: Department) {
    return this.http.put<Department>(
      `${environment.apiUrl}/api/department/${department.id}/`,
      department
    );
  }

  deleteDepartment(id: string) {
    return this.http.delete(`${environment.apiUrl}/api/department/${id}`);
  }
}
