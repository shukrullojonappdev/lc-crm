import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Worker } from '../api/worker';

@Injectable({
  providedIn: 'root'
})
export class WorkersService {
  constructor(private http: HttpClient) {}

  getWorkers(search: string, ordering: string) {
    return this.http.get(
      `${environment.apiUrl}/api/workerApi/?${
        search ? 'search=' + search + '&' : ''
      }${ordering ? 'ordering=' + ordering : ''}`
    );
  }

  getWorker(id: string) {
    return this.http.get<Worker>(`${environment.apiUrl}/api/workerApi/${id}`);
  }

  createWorker(worker: Worker) {
    return this.http.post<Worker>(
      `${environment.apiUrl}/api/workerApi/`,
      worker
    );
  }

  updateWorker(worker: Worker) {
    return this.http.put<Worker>(
      `${environment.apiUrl}/api/workerApi/${worker.id}/`,
      worker
    );
  }

  deleteWorker(id: string) {
    return this.http.delete(`${environment.apiUrl}/api/workerApi/${id}`);
  }
}
