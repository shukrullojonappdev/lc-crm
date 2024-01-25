import { Injectable } from '@angular/core';
import { Room } from '../api/room';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  constructor(private http: HttpClient) {}

  getRooms(page: number | 1) {
    return this.http.get<{
      count: number;
      next: string;
      previous: string;
      results: Room[];
    }>(`${environment.apiUrl}/api/room?page=${page}`);
  }

  getRoom(id: string) {
    return this.http.get<Room>(`${environment.apiUrl}/api/room/${id}`);
  }

  createRoom(room: Room) {
    return this.http.post<Room>(`${environment.apiUrl}/api/room/`, room);
  }

  updateRoom(room: Room) {
    return this.http.put<Room>(
      `${environment.apiUrl}/api/room/${room.id}/`,
      room
    );
  }

  deleteRoom(id: string) {
    return this.http.delete(`${environment.apiUrl}/api/room/${id}`);
  }
}
