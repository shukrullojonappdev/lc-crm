import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService, ScrollerOptions } from 'primeng/api';
import { Course } from 'src/app/api/course';
import { Group } from 'src/app/api/group';
import { Student } from 'src/app/api/student';
import { User } from 'src/app/api/user';
import { CoursesService } from 'src/app/service/courses.service';
import { GroupsService } from 'src/app/service/groups.service';
import { StudentsService } from 'src/app/service/students.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {
  newStudentDialog: boolean = false;
  editStudentDialog: boolean = false;
  deleteStudentDialog: boolean = false;
  deleteStudentsDialog: boolean = false;
  selectedStudent: Student | null = null;
  selectedStudents: Student[] = [];
  students: Student[] = [];
  loading = true;
  cols: any[] = [];

  // * Dropdown values

  // * User
  users: User[];
  usersLoading: boolean;

  // * Paginator values
  page: number = 1;
  totalRecords = 0;

  // * Department
  groups: Group[];
  groupsPage: number;
  groupsLoading: boolean;
  groupsVScroll: any[];
  groupsVScrollLoads: number;
  groupsOptions: ScrollerOptions = {
    delay: 250,
    showLoader: true,
    lazy: true,
    onLazyLoad: this.onGroupsLazyLoad.bind(this)
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

  newStudentForm = this.fb.group({
    user: ['', Validators.required],
    group: [[], Validators.required],
    course: [[], Validators.required],
    descriptions: ['']
  });

  editStudentForm = this.fb.group({
    id: ['', Validators.required],
    user: ['', Validators.required],
    group: [[], Validators.required],
    course: [[], Validators.required],
    descriptions: ['']
  });

  constructor(
    private studentsService: StudentsService,
    private usersService: UsersService,
    private coursesService: CoursesService,
    private groupsService: GroupsService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getStudents(this.page);
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'user', header: 'Fullname' },
      { field: 'group', header: 'Group' },
      { field: 'course', header: 'Course' }
    ];
  }

  onGroupsLazyLoad(e: any) {
    const { first, last } = e;
    if (!this.groupsLoading) this.groupsVScrollLoads++;
    if (this.groupsVScrollLoads === this.groupsPage) {
      this.getGroups(this.groupsPage);
    }

    const items = [...this.groupsVScroll];
    for (let i = first; i < last; i++) {
      items[i] = { ...this.groups[i] };
    }
    this.groupsVScroll = items;
  }

  getGroups(page: number) {
    this.groupsLoading = true;
    this.groupsService.getGroups(page).subscribe((res) => {
      if (this.groupsVScroll.length === 0) {
        const tempEmptyArr = [];
        for (let i = 0; i < res.count; i++) {
          tempEmptyArr.push({
            id: '',
            title: '',
            is_active: '',
            descriptions: ''
          });
        }
        this.groupsVScroll = tempEmptyArr;
      }

      if (this.groups.length !== res.count) {
        const tempWorkers = [...this.groups];
        res.results.forEach((e: any, i: number) => {
          tempWorkers[(this.groupsPage - 1) * 10 + i] = e;
        });

        this.groups = tempWorkers;
      }

      if (this.groupsPage * 10 < res.count) {
        this.groupsPage++;
      }
    });
    this.groupsLoading = false;
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
      console.log(res);

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
        console.log(this.coursesVScroll);
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

  getUsers() {
    this.usersService.getUsers().subscribe((res: any) => {
      this.users = res;
    });
  }

  getStudents(page: number) {
    this.studentsService.getStudents(page).subscribe((res: any) => {
      this.students = res.students;
      this.loading = false;
    });
  }

  onPageChange(e: any) {
    this.loading = true;
    this.getStudents(e.page + 1);
    this.selectedStudents = [];
  }

  // Open dialog functions
  openNewStudentDialog() {
    this.newStudentDialog = true;
    this.users = [];
    this.groups = [];
    this.groupsVScroll = [];
    this.groupsPage = 1;
    this.groupsLoading = true;
    this.courses = [];
    this.coursesVScroll = [];
    this.coursesPage = 1;
    this.coursesVScrollLoads = 1;
    this.getUsers();
    this.getGroups(this.groupsPage);
    this.getCourses(this.coursesPage);
  }

  openEditStudentDialog(student: Student) {
    console.log(student);

    this.editStudentDialog = true;
    this.users = [];
    this.groups = [];
    this.groupsVScroll = [];
    this.groupsPage = 1;
    this.groupsLoading = true;
    this.courses = [];
    this.coursesVScroll = [];
    this.coursesPage = 1;
    this.coursesVScrollLoads = 1;
    this.getUsers();
    this.getGroups(this.groupsPage);
    this.getCourses(this.coursesPage);
    this.editStudentForm.patchValue(student as any);
  }

  openDeleteStudentDialog(Student: Student) {
    this.deleteStudentDialog = true;
    this.selectedStudent = Student;
  }

  openDeleteStudentsDialog() {
    this.deleteStudentsDialog = true;
  }

  // Close dialog functions
  hideNewStudentDialog() {
    this.newStudentDialog = false;
    this.newStudentForm.reset();
  }

  hideEditStudentDialog() {
    this.editStudentDialog = false;
    this.editStudentForm.reset();
  }

  hideDeleteStudentDialog() {
    this.deleteStudentDialog = false;
    this.selectedStudent = null;
  }

  hideDeleteStudentsDialog() {
    this.deleteStudentsDialog = false;
  }

  // Dialog actions
  createNewStudent() {
    if (this.newStudentForm.valid) {
      this.studentsService
        .createStudent(this.newStudentForm.value as Student)
        .subscribe(() => {
          this.newStudentForm.reset();
          this.newStudentDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'New Student created'
          });
          this.getStudents(this.page);
        });
    }
  }

  deleteStudent() {
    if (this.selectedStudent.id) {
      this.studentsService
        .deleteStudent(this.selectedStudent.id)
        .subscribe(() => {
          this.deleteStudentDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Student deleted'
          });
          this.getStudents(this.page);
        });
    }
  }

  updateStudent() {
    if (this.editStudentForm.valid) {
      this.studentsService
        .updateStudent(this.editStudentForm.value as Student)
        .subscribe(() => {
          this.editStudentForm.reset();
          this.editStudentDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Student updated'
          });
          this.getStudents(this.page);
        });
    }
  }

  deleteStudents() {
    this.selectedStudents.forEach((e, index) => {
      if (e.id) {
        this.studentsService.deleteStudent(e.id).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Student deleted'
          });

          if (this.selectedStudents.length - 1 === index) {
            this.deleteStudentsDialog = false;
            this.getStudents(this.page);
            this.selectedStudents = [];
          }
        });
      }
    });
  }

  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  checkToRole(user: User) {
    if (user.is_teacher) return false;
    if (user.is_staff) return false;
    return true;
  }
}
