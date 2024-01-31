import { Component } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { MessageService, ScrollerOptions } from 'primeng/api';
import { Course } from 'src/app/api/course';
import { Group } from 'src/app/api/group';
import { Teacher } from 'src/app/api/teacher';
import { Timetable } from 'src/app/api/timetable';
import { CoursesService } from 'src/app/service/courses.service';
import { GroupsService } from 'src/app/service/groups.service';
import { TeacherService } from 'src/app/service/teacher.service';
import { TimetableService } from 'src/app/service/timetable.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss'
})
export class GroupsComponent {
  newGroupDialog: boolean = false;
  editGroupDialog: boolean = false;
  deleteGroupDialog: boolean = false;
  deleteGroupsDialog: boolean = false;
  selectedGroup: Group | null = null;
  selectedGroups: Group[] = [];
  groups: Group[] = [];
  loading = true;
  cols: any[] = [];

  // * Paginator values
  page: number = 1;
  totalRecords = 0;

  // * Teacher
  teachers: Teacher[];

  // * Course
  courses: Course[];
  coursesPage: number;
  coursesLoading: boolean;
  coursesVScroll: any[];
  coursesVScrollLoads: number;
  coursesOptions: ScrollerOptions = {
    delay: 250,
    showLoader: true,
    lazy: true,
    onLazyLoad: this.onCoursesLazyLoad.bind(this)
  };

  // * Timetable
  timetables: Timetable[];
  timetablesPage: number;
  timetablesLoading: boolean;
  timetablesVScroll: any[];
  timetablesVScrollLoads: number;
  timetablesOptions: ScrollerOptions = {
    delay: 250,
    showLoader: true,
    lazy: true,
    onLazyLoad: this.onTimetablesLazyLoad.bind(this)
  };

  newGroupForm = this.fb.group({
    title: ['', Validators.required],
    course: [' ', Validators.required],
    teacher: [[], Validators.required],
    table: [' ', Validators.required],
    start_date: ['', Validators.required],
    end_date: ['', Validators.required],
    price: [''],
    descriptions: ['']
  });

  editGroupForm = this.fb.group({
    id: ['', Validators.required],
    title: ['', Validators.required],
    course: [' ', Validators.required],
    teacher: [[], Validators.required],
    table: ['', Validators.required],
    start_date: ['', Validators.required],
    end_date: ['', Validators.required],
    price: [''],
    descriptions: ['']
  });

  constructor(
    private groupsService: GroupsService,
    private coursesService: CoursesService,
    private teachersService: TeacherService,
    private timetablesService: TimetableService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getGroups(this.page);
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'title', header: 'Title' },
      { field: 'start_date', header: 'Start date' },
      { field: 'end_date', header: 'End date' }
    ];
  }

  getTeacher(a, b) {
    this.teachersService.getTeachers(a, b).subscribe((res: any) => {
      this.teachers = res;
    });
  }

  onCoursesLazyLoad(e: any) {
    console.log('course');
    const { first, last } = e;
    if (!this.coursesLoading) this.coursesVScrollLoads++;
    if (this.coursesVScrollLoads === this.coursesPage) {
      this.getCourses(this.coursesPage);
    }

    const items = [...this.coursesVScroll];
    for (let i = first; i < last; i++) {
      items[i] = { ...this.courses[i] };
    }
    this.coursesVScroll = items;
  }

  getCourses(page: number) {
    this.coursesLoading = true;
    this.coursesService.getCourses(page).subscribe((res) => {
      if (this.coursesVScroll.length === 0) {
        const tempEmptyArr = [];
        for (let i = 0; i < res.count; i++) {
          tempEmptyArr.push({
            id: '',
            title: '',
            descriptions: ''
          });
        }
        this.coursesVScroll = tempEmptyArr;
      }

      if (this.courses.length !== res.count) {
        const tempCourses = [...this.courses];
        res.results.forEach((e: any, i: number) => {
          tempCourses[(this.coursesPage - 1) * 10 + i] = e;
        });

        this.courses = tempCourses;
      }

      if (this.coursesPage * 10 < res.count) {
        this.coursesPage++;
      }
    });
    this.coursesLoading = false;
  }

  onTimetablesLazyLoad(e: any) {
    console.log('table');

    const { first, last } = e;
    if (!this.timetablesLoading) this.timetablesVScrollLoads++;
    if (this.timetablesVScrollLoads === this.timetablesPage) {
      this.getTimetables(this.timetablesPage);
    }

    const items = [...this.timetablesVScroll];
    for (let i = first; i < last; i++) {
      items[i] = { ...this.timetables[i] };
    }
    this.timetablesVScroll = items;
  }

  getTimetables(page: number) {
    this.timetablesLoading = true;
    this.timetablesService.getTimetables(page).subscribe((res) => {
      if (this.timetablesVScroll.length === 0) {
        const tempEmptyArr = [];
        for (let i = 0; i < res.count; i++) {
          tempEmptyArr.push({
            id: '',
            start_time: '',
            end_time: '',
            room: '',
            type: ''
          });
        }
        this.timetablesVScroll = tempEmptyArr;
      }

      if (this.timetables.length !== res.count) {
        const temptimetables = [...this.timetables];
        res.results.forEach((e: any, i: number) => {
          temptimetables[(this.timetablesPage - 1) * 10 + i] = e;
        });

        this.timetables = temptimetables;
      }

      if (this.timetablesPage * 10 < res.count) {
        this.timetablesPage++;
      }
    });
    this.timetablesLoading = false;
  }

  getGroups(page: number) {
    this.groupsService.getGroups(page).subscribe((res: any) => {
      this.totalRecords = res.count;
      this.groups = res.results;
      this.loading = false;
    });
  }

  onPageChange(e: any) {
    this.loading = true;
    this.getGroups(e.page + 1);
    this.selectedGroups = [];
  }

  // Open dialog functions
  openNewGroupDialog() {
    this.newGroupDialog = true;
    this.timetables = [];
    this.timetablesVScroll = [];
    this.timetablesPage = 1;
    this.timetablesLoading = true;
    this.courses = [];
    this.coursesVScroll = [];
    this.coursesPage = 1;
    this.coursesVScrollLoads = 1;
    this.getTeacher(null, null);
    this.getTimetables(this.timetablesPage);
    this.getCourses(this.coursesPage);
  }

  openEditGroupDialog(group: Group) {
    this.editGroupDialog = true;
    this.timetables = [];
    this.timetablesVScroll = [];
    this.timetablesPage = 1;
    this.timetablesLoading = true;
    this.courses = [];
    this.coursesVScroll = [];
    this.coursesPage = 1;
    this.coursesVScrollLoads = 1;
    this.getTeacher(null, null);
    this.getTimetables(this.timetablesPage);
    this.getCourses(this.coursesPage);
    this.editGroupForm.setValue(group as any);
  }

  openDeleteGroupDialog(Group: Group) {
    this.deleteGroupDialog = true;
    this.selectedGroup = Group;
  }

  openDeleteGroupsDialog() {
    this.deleteGroupsDialog = true;
  }

  // Close dialog functions
  hideNewGroupDialog() {
    this.newGroupDialog = false;
    this.newGroupForm.reset();
  }

  hideEditGroupDialog() {
    this.editGroupDialog = false;
    this.editGroupForm.reset();
  }

  hideDeleteGroupDialog() {
    this.deleteGroupDialog = false;
    this.selectedGroup = null;
  }

  hideDeleteGroupsDialog() {
    this.deleteGroupsDialog = false;
  }

  // Dialog actions
  createNewGroup() {
    console.log(this.newGroupForm.value);

    if (this.newGroupForm.valid) {
      this.groupsService
        .createGroup(this.newGroupForm.value as any)
        .subscribe(() => {
          this.newGroupForm.reset();
          this.newGroupDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'New group created'
          });
          this.getGroups(this.page);
        });
    }
  }

  deleteGroup() {
    if (this.selectedGroup.id) {
      this.groupsService.deleteGroup(this.selectedGroup.id).subscribe(() => {
        this.deleteGroupDialog = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Group deleted'
        });
        this.getGroups(this.page);
      });
    }
  }

  updateGroup() {
    if (this.editGroupForm.valid) {
      this.groupsService
        .updateGroup(this.editGroupForm.value as any)
        .subscribe(() => {
          this.editGroupForm.reset();
          this.editGroupDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Group updated'
          });
          this.getGroups(this.page);
        });
    }
  }

  deleteGroups() {
    this.selectedGroups.forEach((e, index) => {
      if (e.id) {
        this.groupsService.deleteGroup(e.id).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Group deleted'
          });

          if (this.selectedGroups.length - 1 === index) {
            this.deleteGroupsDialog = false;
            this.getGroups(this.page);
            this.selectedGroups = [];
          }
        });
      }
    });
  }

  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  selectDateC(e, date_type) {
    if (date_type === 'start_date') {
      this.newGroupForm.controls['start_date'].setValue(this.getDate(e));
    }
    if (date_type === 'end_date') {
      this.newGroupForm.controls['end_date'].setValue(this.getDate(e));
    }
  }

  selectDateE(e, date_type) {
    if (date_type === 'start_date') {
      this.editGroupForm.controls['start_date'].setValue(this.getDate(e));
    }
    if (date_type === 'end_date') {
      this.editGroupForm.controls['end_date'].setValue(this.getDate(e));
    }
  }

  getDate(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  }
}
