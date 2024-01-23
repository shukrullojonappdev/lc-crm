import { Component } from '@angular/core';
import { Course } from 'src/app/api/course';

import { MessageService } from 'primeng/api';
import { CoursesService } from 'src/app/service/courses.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  newCourseDialog: boolean = false;
  editCourseDialog: boolean = false;
  deleteCourseDialog: boolean = false;
  deleteCoursesDialog: boolean = false;
  selectedCourse: Course | null = null;
  selectedCourses: Course[] = [];
  courses: Course[] = [];
  loading = true;

  // * Paginator values
  page: number = 1;
  totalRecords = 0;

  newCourseForm = this.fb.group({
    title: ['', Validators.required],
    descriptions: ['']
  });

  editCourseForm = this.fb.group({
    id: ['', Validators.required],
    title: ['', Validators.required],
    descriptions: ['']
  });

  constructor(
    private coursesService: CoursesService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getCourses(this.page);
  }

  getCourses(page: number) {
    this.coursesService.getCourses(page).subscribe((res: any) => {
      this.totalRecords = res.count;
      this.courses = res.results;
      this.loading = false;
    });
  }

  onPageChange(e: any) {
    this.loading = true;
    this.getCourses(e.page + 1);
    this.selectedCourses = [];
  }

  // Open dialog functions
  openNewCourseDialog() {
    this.newCourseDialog = true;
  }

  openEditCourseDialog(course: Course) {
    this.editCourseDialog = true;
    this.editCourseForm.setValue(course);
  }

  openDeleteCourseDialog(course: Course) {
    this.deleteCourseDialog = true;
    this.selectedCourse = course;
  }

  openDeleteCoursesDialog() {
    this.deleteCoursesDialog = true;
    console.log(this.selectedCourses);
  }

  // Close dialog functions
  hideNewCourseDialog() {
    this.newCourseDialog = false;
    this.newCourseForm.reset();
  }

  hideEditCourseDialog() {
    this.editCourseDialog = false;
    this.editCourseForm.reset();
  }

  hideDeleteCourseDialog() {
    this.deleteCourseDialog = false;
    this.selectedCourse = null;
  }

  hideDeleteCoursesDialog() {
    this.deleteCoursesDialog = false;
  }

  // Dialog actions
  createNewCourse() {
    if (this.newCourseForm.valid) {
      this.coursesService
        .createCourse(this.newCourseForm.value as Course)
        .subscribe(() => {
          this.newCourseForm.reset();
          this.newCourseDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'New course created'
          });
          this.getCourses(this.page);
        });
    }
  }

  deleteCourse() {
    if (this.selectedCourse.id) {
      this.coursesService.deleteCourse(this.selectedCourse.id).subscribe(() => {
        this.deleteCourseDialog = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Course deleted'
        });
        this.getCourses(this.page);
      });
    }
  }

  updateCourse() {
    if (this.editCourseForm.valid) {
      this.coursesService
        .updateCourse(this.editCourseForm.value as Course)
        .subscribe(() => {
          this.editCourseForm.reset();
          this.editCourseDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Course updated'
          });
          this.getCourses(this.page);
        });
    }
  }

  deleteCourses() {
    this.selectedCourses.forEach((e, index) => {
      if (e.id) {
        this.coursesService.deleteCourse(e.id).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Course deleted'
          });

          if (this.selectedCourses.length - 1 === index) {
            this.deleteCoursesDialog = false;
            this.getCourses(this.page);
            this.selectedCourses = [];
          }
        });
      }
    });
  }

  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
