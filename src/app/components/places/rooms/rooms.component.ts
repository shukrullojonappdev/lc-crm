import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Room } from 'src/app/api/room';
import { RoomsService } from 'src/app/service/rooms.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent {
  newRoomDialog: boolean = false;
  editRoomDialog: boolean = false;
  deleteRoomDialog: boolean = false;
  deleteRoomsDialog: boolean = false;
  selectedRoom: Room | null = null;
  selectedRooms: Room[] = [];
  rooms: Room[] = [];
  loading = true;
  cols: any[] = [];

  // * Paginator values
  page: number = 1;
  totalRecords = 0;

  newRoomForm = this.fb.group({
    title: ['', Validators.required],
    descriptions: ['']
  });

  editRoomForm = this.fb.group({
    id: ['', Validators.required],
    title: ['', Validators.required],
    descriptions: ['']
  });

  constructor(
    private roomsService: RoomsService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getRooms(this.page);
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'title', header: 'Title' }
    ];
  }

  getRooms(page: number) {
    this.roomsService.getRooms(page).subscribe((res: any) => {
      this.totalRecords = res.count;
      this.rooms = res.results;
      this.loading = false;
    });
  }

  onPageChange(e: any) {
    this.loading = true;
    this.getRooms(e.page + 1);
    this.selectedRooms = [];
  }

  // Open dialog functions
  openNewRoomDialog() {
    this.newRoomDialog = true;
  }

  openEditRoomDialog(room: Room) {
    this.editRoomDialog = true;
    this.editRoomForm.setValue(room);
  }

  openDeleteRoomDialog(room: Room) {
    this.deleteRoomDialog = true;
    this.selectedRoom = room;
  }

  openDeleteRoomsDialog() {
    this.deleteRoomsDialog = true;
  }

  // Close dialog functions
  hideNewRoomDialog() {
    this.newRoomDialog = false;
    this.newRoomForm.reset();
  }

  hideEditRoomDialog() {
    this.editRoomDialog = false;
    this.editRoomForm.reset();
  }

  hideDeleteRoomDialog() {
    this.deleteRoomDialog = false;
    this.selectedRoom = null;
  }

  hideDeleteRoomsDialog() {
    this.deleteRoomsDialog = false;
  }

  // Dialog actions
  createNewRoom() {
    if (this.newRoomForm.valid) {
      this.roomsService
        .createRoom(this.newRoomForm.value as Room)
        .subscribe(() => {
          this.newRoomForm.reset();
          this.newRoomDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'New room created'
          });
          this.getRooms(this.page);
        });
    }
  }

  deleteRoom() {
    if (this.selectedRoom.id) {
      this.roomsService.deleteRoom(this.selectedRoom.id).subscribe(() => {
        this.deleteRoomDialog = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Room deleted'
        });
        this.getRooms(this.page);
      });
    }
  }

  updateRoom() {
    if (this.editRoomForm.valid) {
      this.roomsService
        .updateRoom(this.editRoomForm.value as Room)
        .subscribe(() => {
          this.editRoomForm.reset();
          this.editRoomDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Room updated'
          });
          this.getRooms(this.page);
        });
    }
  }

  deleteRooms() {
    this.selectedRooms.forEach((e, index) => {
      if (e.id) {
        this.roomsService.deleteRoom(e.id).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Room deleted'
          });

          if (this.selectedRooms.length - 1 === index) {
            this.deleteRoomsDialog = false;
            this.getRooms(this.page);
            this.selectedRooms = [];
          }
        });
      }
    });
  }

  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
