import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService, ScrollerOptions } from 'primeng/api';
import { Student } from 'src/app/api/student';
import { User } from 'src/app/api/user';
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

  newStudentForm = this.fb.group({
    title: ['', Validators.required],
    Student: [' ', Validators.required],
    descriptions: ['']
  });

  editStudentForm = this.fb.group({
    id: ['', Validators.required],
    title: ['', Validators.required],
    Student: ['', Validators.required],
    descriptions: ['']
  });

  constructor(
    private studentsService: StudentsService,
    private usersService: UsersService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getStudents(this.page);
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'title', header: 'Title' },
      { field: 'Student', header: 'User' }
    ];
  }

  getUsers() {
    this.users = [];
    this.usersLoading = true;
    this.usersService.getUsers().subscribe((res: any) => {
      this.users = res;
    });
    this.usersLoading = false;
  }

  getStudents(page: number) {
    this.studentsService.getStudents(page).subscribe((res: any) => {
      this.totalRecords = res.count;
      this.students = res.results;
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
    this.getUsers();
  }

  openEditStudentDialog(Student: Student) {
    this.editStudentDialog = true;
    this.getUsers();
    this.editStudentForm.patchValue(Student as any);
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
}
