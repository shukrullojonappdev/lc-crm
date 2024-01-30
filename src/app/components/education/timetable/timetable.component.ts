import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService, ScrollerOptions } from 'primeng/api';
import { Room } from 'src/app/api/room';
import { Timetable } from 'src/app/api/timetable';
import { RoomsService } from 'src/app/service/rooms.service';
import { TimetableService } from 'src/app/service/timetable.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrl: './timetable.component.scss'
})
export class TimetableComponent {
  newTimetableDialog: boolean = false;
  editTimetableDialog: boolean = false;
  deleteTimetableDialog: boolean = false;
  deleteTimetablesDialog: boolean = false;
  selectedTimetable: Timetable | null = null;
  selectedTimetables: Timetable[] = [];
  Timetables: Timetable[] = [];
  loading = true;
  cols: any[] = [];

  // * Dropdown values

  // * room
  rooms: Room[];
  roomsPage: number;
  roomsLoading: boolean;
  roomsVScroll: any[];
  roomsVScrollLoads: number;
  roomsOptions: ScrollerOptions = {
    delay: 250,
    showLoader: true,
    lazy: true,
    onLazyLoad: this.onroomsLazyLoad.bind(this)
  };

  // * Paginator values
  page: number = 1;
  totalRecords = 0;

  newTimetableForm = this.fb.group({
    start_time: ['', Validators.required],
    end_time: ['', Validators.required],
    room: [' ', [Validators.required, Validators.pattern(/\d/)]],
    type: [' ', [Validators.required, Validators.pattern(/\d/)]],
    descriptions: [' ']
  });

  editTimetableForm = this.fb.group({
    id: ['', Validators.required],
    start_time: ['', Validators.required],
    end_time: ['', Validators.required],
    room: ['', [Validators.required, Validators.pattern(/\d/)]],
    type: ['', [Validators.required, Validators.pattern(/\d/)]],
    descriptions: ['']
  });

  constructor(
    private timetablesService: TimetableService,
    private roomsService: RoomsService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getTimetables(this.page);
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'title', header: 'Title' },
      { field: 'room', header: 'room' }
    ];
  }

  onroomsLazyLoad(e: any) {
    const { first, last } = e;
    if (!this.roomsLoading) this.roomsVScrollLoads++;
    if (this.roomsVScrollLoads === this.roomsPage) {
      this.getrooms(this.roomsPage);
    }

    const items = [...this.roomsVScroll];
    for (let i = first; i < last; i++) {
      items[i] = { ...this.rooms[i] };
    }
    this.roomsVScroll = items;
  }

  getrooms(page: number) {
    this.roomsLoading = true;
    this.roomsService.getRooms(page).subscribe((res) => {
      if (this.roomsVScroll.length === 0) {
        const tempEmptyArr = [];
        for (let i = 0; i < res.count; i++) {
          tempEmptyArr.push({
            id: '',
            title: '',
            descriptions: ''
          });
        }
        this.roomsVScroll = tempEmptyArr;
      }

      if (this.rooms.length !== res.count) {
        const temprooms = [...this.rooms];
        res.results.forEach((e: any, i: number) => {
          temprooms[(this.roomsPage - 1) * 10 + i] = e;
        });

        this.rooms = temprooms;
      }

      if (this.roomsPage * 10 < res.count) {
        this.roomsPage++;
      }
    });
    this.roomsLoading = false;
  }

  getTimetables(page: number) {
    this.timetablesService.getTimetables(page).subscribe((res: any) => {
      this.totalRecords = res.count;
      this.Timetables = res.results;
      this.loading = false;
    });
  }

  onPageChange(e: any) {
    this.loading = true;
    this.getTimetables(e.page + 1);
    this.selectedTimetables = [];
  }

  // Open dialog functions
  openNewTimetableDialog() {
    this.newTimetableDialog = true;
    this.rooms = [];
    this.roomsVScroll = [];
    this.roomsPage = 1;
    this.roomsVScrollLoads = 1;
    this.getrooms(this.roomsPage);
  }

  openEditTimetableDialog(timetable: Timetable) {
    this.editTimetableDialog = true;
    this.rooms = [];
    this.roomsVScroll = [];
    this.roomsPage = 1;
    this.roomsVScrollLoads = 1;
    this.getrooms(this.roomsPage);
    this.editTimetableForm.patchValue(timetable as any);
  }

  openDeleteTimetableDialog(timetable: Timetable) {
    this.deleteTimetableDialog = true;
    this.selectedTimetable = timetable;
  }

  openDeleteTimetablesDialog() {
    this.deleteTimetablesDialog = true;
  }

  // Close dialog functions
  hideNewTimetableDialog() {
    this.newTimetableDialog = false;
    this.newTimetableForm.reset();
  }

  hideEditTimetableDialog() {
    this.editTimetableDialog = false;
    this.editTimetableForm.reset();
  }

  hideDeleteTimetableDialog() {
    this.deleteTimetableDialog = false;
    this.selectedTimetable = null;
  }

  hideDeleteTimetablesDialog() {
    this.deleteTimetablesDialog = false;
  }

  // Dialog actions
  createNewTimetable() {
    if (this.newTimetableForm.valid) {
      this.timetablesService
        .createTimetable(this.newTimetableForm.value as any)
        .subscribe(() => {
          this.newTimetableForm.reset();
          this.newTimetableDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'New timetable created'
          });
          this.getTimetables(this.page);
        });
    }
  }

  deleteTimetable() {
    if (this.selectedTimetable.id) {
      this.timetablesService
        .deleteTimetable(this.selectedTimetable.id)
        .subscribe(() => {
          this.deleteTimetableDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Timetable deleted'
          });
          this.getTimetables(this.page);
        });
    }
  }

  updateTimetable() {
    if (this.editTimetableForm.valid) {
      this.timetablesService
        .updateTimetable(this.editTimetableForm.value as any)
        .subscribe(() => {
          this.editTimetableForm.reset();
          this.editTimetableDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Timetable updated'
          });
          this.getTimetables(this.page);
        });
    }
  }

  deleteTimetables() {
    this.selectedTimetables.forEach((e, index) => {
      if (e.id) {
        this.timetablesService.deleteTimetable(e.id).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Timetable deleted'
          });

          if (this.selectedTimetables.length - 1 === index) {
            this.deleteTimetablesDialog = false;
            this.getTimetables(this.page);
            this.selectedTimetables = [];
          }
        });
      }
    });
  }

  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
