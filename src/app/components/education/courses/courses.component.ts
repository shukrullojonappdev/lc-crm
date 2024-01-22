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
  cols: any[] = [];
  statuses: any[] = [];
  courses: Course[] = [];
  selectedCourses: Course[] = [];
  page: number = 1;

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

    this.cols = [
      { field: 'ID', header: 'any' },
      { field: 'title', header: 'Title' }
    ];
  }

  getCourses(page: number) {
    this.coursesService.getCourses(page).subscribe((res: any) => {
      this.courses = res.results;
    });
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
    this.deleteCourseDialog = false;
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
    this.deleteCoursesDialog = true;
    console.log(this.selectedCourses);
  }

  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}