import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService, ScrollerOptions } from 'primeng/api';
import { Course } from 'src/app/api/course';
import { Department } from 'src/app/api/department';
import { User } from 'src/app/api/user';
import { Worker } from 'src/app/api/worker';
import { CoursesService } from 'src/app/service/courses.service';
import { DepartmentsService } from 'src/app/service/departments.service';
import { UsersService } from 'src/app/service/users.service';
import { WorkersService } from 'src/app/service/workers.service';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrl: './workers.component.scss'
})
export class WorkersComponent {
  newWorkerDialog: boolean = false;
  editWorkerDialog: boolean = false;
  deleteWorkerDialog: boolean = false;
  deleteWorkersDialog: boolean = false;
  selectedWorker: Worker | null = null;
  selectedWorkers: Worker[] = [];
  workers: Worker[] = [];
  loading = true;
  cols: any[] = [];

  // * Dropdown values
  roles: any[];
  // * User
  users: User[];

  // * Department
  departments: Department[];
  departmentsPage: number;
  departmentsLoading: boolean;
  departmentsVScroll: any[];
  departmentsVScrollLoads: number;
  departmentsOptions: ScrollerOptions = {
    delay: 250,
    showLoader: true,
    lazy: true,
    onLazyLoad: this.onDepartmentsLazyLoad.bind(this)
  };

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

  search: string = '';
  ordering: string = '';
  totalRecords = 0;

  newWorkerForm = this.fb.group({
    user: ['', Validators.required],
    departments: [[], Validators.required],
    course: [[], Validators.required],
    descriptions: ['']
  });

  editWorkerForm = this.fb.group({
    id: ['', Validators.required],
    user: ['', Validators.required],
    departments: [[], Validators.required],
    course: [[], Validators.required],
    descriptions: ['']
  });

  constructor(
    private workersService: WorkersService,
    private coursesService: CoursesService,
    private usersService: UsersService,
    private departmentsService: DepartmentsService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getWorkers(this.search, this.ordering);
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'title', header: 'Title' },
      { field: 'Worker', header: 'User' }
    ];
    this.roles = [
      {
        id: 0,
        title: $localize`Teacher`
      },
      {
        id: 1,
        title: $localize`Staff`
      }
    ];
  }

  getUsers() {
    this.usersService.getUsers().subscribe((res: any) => {
      this.users = res;
    });
  }

  onDepartmentsLazyLoad(e: any) {
    const { first, last } = e;
    if (!this.departmentsLoading) this.departmentsVScrollLoads++;
    if (this.departmentsVScrollLoads === this.departmentsPage) {
      this.getDepartments(this.departmentsPage);
    }

    const items = [...this.departmentsVScroll];
    for (let i = first; i < last; i++) {
      items[i] = { ...this.departments[i] };
    }
    this.departmentsVScroll = items;
  }

  getDepartments(page: number) {
    this.departmentsLoading = true;
    this.departmentsService.getDepartments(page).subscribe((res) => {
      if (this.departmentsVScroll.length === 0) {
        const tempEmptyArr = [];
        for (let i = 0; i < res.count; i++) {
          tempEmptyArr.push({
            id: '',
            title: '',
            is_active: '',
            descriptions: ''
          });
        }
        this.departmentsVScroll = tempEmptyArr;
      }

      if (this.departments.length !== res.count) {
        const tempWorkers = [...this.departments];
        res.results.forEach((e: any, i: number) => {
          tempWorkers[(this.departmentsPage - 1) * 10 + i] = e;
        });

        this.departments = tempWorkers;
      }

      if (this.departmentsPage * 10 < res.count) {
        this.departmentsPage++;
      }
    });
    this.departmentsLoading = false;
  }

  onCoursesLazyLoad(e: any) {
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

  getWorkers(search: string, ordering: string) {
    this.workersService.getWorkers(search, ordering).subscribe((res: any) => {
      this.totalRecords = res.count;
      this.workers = res.results;
      this.loading = false;
    });
  }

  // Open dialog functions
  openNewWorkerDialog() {
    this.newWorkerDialog = true;
    this.users = [];
    this.departments = [];
    this.departmentsVScroll = [];
    this.departmentsPage = 1;
    this.departmentsLoading = true;
    this.courses = [];
    this.coursesVScroll = [];
    this.coursesPage = 1;
    this.coursesVScrollLoads = 1;
    this.getUsers();
    this.getDepartments(this.departmentsPage);
    this.getCourses(this.coursesPage);
  }

  openEditWorkerDialog(worker: Worker) {
    this.editWorkerDialog = true;
    this.users = [];
    this.departments = [];
    this.departmentsVScroll = [];
    this.departmentsPage = 1;
    this.departmentsLoading = true;
    this.courses = [];
    this.coursesVScroll = [];
    this.coursesPage = 1;
    this.coursesVScrollLoads = 1;
    this.getUsers();
    this.getDepartments(this.departmentsPage);
    this.getCourses(this.coursesPage);
    this.editWorkerForm.patchValue(worker as any);
  }

  openDeleteWorkerDialog(worker: Worker) {
    this.deleteWorkerDialog = true;
    this.selectedWorker = worker;
  }

  openDeleteWorkersDialog() {
    this.deleteWorkersDialog = true;
  }

  // Close dialog functions
  hideNewWorkerDialog() {
    this.newWorkerDialog = false;
    this.newWorkerForm.reset();
  }

  hideEditWorkerDialog() {
    this.editWorkerDialog = false;
    this.editWorkerForm.reset();
  }

  hideDeleteWorkerDialog() {
    this.deleteWorkerDialog = false;
    this.selectedWorker = null;
  }

  hideDeleteWorkersDialog() {
    this.deleteWorkersDialog = false;
  }

  // Dialog actions
  createNewWorker() {
    if (this.newWorkerForm.valid) {
      this.workersService
        .createWorker(this.newWorkerForm.value as Worker)
        .subscribe(() => {
          this.newWorkerForm.reset();
          this.newWorkerDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'New worker created'
          });
          this.getWorkers(this.search, this.ordering);
        });
    }
  }

  deleteWorker() {
    if (this.selectedWorker.id) {
      this.workersService.deleteWorker(this.selectedWorker.id).subscribe(() => {
        this.deleteWorkerDialog = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Worker deleted'
        });
        this.getWorkers(this.search, this.ordering);
      });
    }
  }

  updateWorker() {
    if (this.editWorkerForm.valid) {
      this.workersService
        .updateWorker(this.editWorkerForm.value as Worker)
        .subscribe(() => {
          this.editWorkerForm.reset();
          this.editWorkerDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Worker updated'
          });
          this.getWorkers(this.search, this.ordering);
        });
    }
  }

  deleteWorkers() {
    this.selectedWorkers.forEach((e, index) => {
      if (e.id) {
        this.workersService.deleteWorker(e.id).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Worker deleted'
          });

          if (this.selectedWorkers.length - 1 === index) {
            this.deleteWorkersDialog = false;
            this.getWorkers(this.search, this.ordering);
            this.selectedWorkers = [];
          }
        });
      }
    });
  }

  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  checkToRole(user: User) {
    if (user.is_student) return false;
    if (user.is_staff) return false;
    return true;
  }
}
