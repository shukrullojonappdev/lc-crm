import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { MessageService } from 'primeng/api';
import { AttendancesService } from 'src/app/service/attendances.service';
import { GroupsService } from 'src/app/service/groups.service';

const levelsJson = {
  5: $localize`Holiday`,
  4: $localize`Didn't come for a reason`,
  3: $localize`Came late`,
  2: $localize`Came`,
  1: $localize`Didn't come`
};

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
  students: any[] = [];
  attendances: any[] = [];

  calendarOptions: any | CalendarOptions;

  visible = false;
  level: any;
  levels: any;

  attendanceForm = this.fb.group({
    student: ['', Validators.required],
    level: ['', Validators.required],
    group: ['', Validators.required]
  });

  constructor(
    private groupsService: GroupsService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private attendancesService: AttendancesService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const groupId = this.route.snapshot.params['id'];
    this.getGroupStudents(groupId);
    this.attendancesService.getAttendanceLevels(1).subscribe((res: any) => {
      this.levels = res.results;
    });

    this.calendarOptions = {
      schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
      plugins: [resourceTimelinePlugin, interactionPlugin],
      initialView: 'resourceTimelineMonth',
      dateClick: (info) => {
        this.visible = true;
        this.attendanceForm.patchValue({
          student: info.resource._resource.id,
          group: groupId
        });
      },
      events: [],
      selectable: true,
      resources: []
    };
  }

  getGroupStudents(groupId) {
    this.groupsService.getGroupStudents(groupId).subscribe((res: any) => {
      res.student.forEach((e) => {
        this.students.push({ id: e.id, title: e.user.full_name });
      });
      res.attendance.forEach((e) => {
        this.attendances.push({
          resourceId: e.student,
          title: levelsJson[e.level],
          date: e.created.slice(0, 10),
          id: e.id
        });
      });
      this.calendarOptions.resources = [...this.students];
      this.calendarOptions.events = [...this.attendances];
      console.log(this.attendances, this.students);
    });
  }

  save() {
    if (!this.attendanceForm.valid) return;
    this.visible = false;
    this.attendancesService
      .createAttendance(this.attendanceForm.value as any)
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Attendance created'
        });
        this.attendanceForm.reset();
        this.level = null;
        this.getGroupStudents(this.route.snapshot.params['id']);
      });
  }
}
