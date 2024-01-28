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
  newTopicDialog: boolean = false;
  editTopicDialog: boolean = false;
  deleteTopicDialog: boolean = false;
  deleteTopicsDialog: boolean = false;
  selectedTopic: Student | null = null;
  selectedTopics: Student[] = [];
  topics: Student[] = [];
  loading = true;
  cols: any[] = [];

  // * Dropdown values

  // * User
  users: User[];
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

  // * Paginator values
  page: number = 1;
  totalRecords = 0;

  newTopicForm = this.fb.group({
    title: ['', Validators.required],
    course: [' ', Validators.required],
    descriptions: ['']
  });

  editTopicForm = this.fb.group({
    id: ['', Validators.required],
    title: ['', Validators.required],
    course: ['', Validators.required],
    descriptions: ['']
  });

  constructor(
    private studentsService: StudentsService,
    private usersService: UsersService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getTopics(this.page);
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'title', header: 'Title' },
      { field: 'course', header: 'User' }
    ];
  }

  onCoursesLazyLoad(e: any) {
    const { first, last } = e;
    if (!this.coursesLoading) this.coursesVScrollLoads++;
    if (this.coursesVScrollLoads === this.coursesPage) {
      this.getCourses(this.coursesPage);
    }

    const items = [...this.coursesVScroll];
    for (let i = first; i < last; i++) {
      items[i] = { ...this.users[i] };
    }
    this.coursesVScroll = items;
  }

  async getCourses(page: number) {
    this.coursesLoading = true;
    this.usersService.getCourses(page).subscribe((res) => {
      if (this.coursesVScroll.length === 0) {
        const tempEmptyArr = [];
        for (let i = 0; i < res.count; i++) {
          tempEmptyArr.push({
            id: '',
            title: 'empty',
            descriptions: ''
          });
        }
        this.coursesVScroll = tempEmptyArr;
      }

      if (this.users.length !== res.count) {
        const tempCourses = [...this.users];
        res.results.forEach((e: any, i: number) => {
          tempCourses[(this.coursesPage - 1) * 10 + i] = e;
        });

        this.users = tempCourses;
      }

      if (this.coursesPage * 10 < res.count) {
        this.coursesPage++;
      }
    });
    this.coursesLoading = false;
  }

  getTopics(page: number) {
    this.studentsService.getTopics(page).subscribe((res: any) => {
      this.totalRecords = res.count;
      this.topics = res.results;
      this.loading = false;
    });
  }

  onPageChange(e: any) {
    this.loading = true;
    this.getTopics(e.page + 1);
    this.selectedTopics = [];
  }

  // Open dialog functions
  openNewTopicDialog() {
    this.newTopicDialog = true;
    this.users = [];
    this.coursesVScroll = [];
    this.coursesPage = 1;
    this.coursesVScrollLoads = 1;
    this.getCourses(this.coursesPage);
  }

  openEditTopicDialog(topic: Student) {
    this.editTopicDialog = true;
    this.users = [];
    this.coursesVScroll = [];
    this.coursesPage = 1;
    this.coursesVScrollLoads = 1;
    this.getCourses(this.coursesPage);
    this.editTopicForm.patchValue(topic as any);
  }

  openDeleteTopicDialog(topic: Student) {
    this.deleteTopicDialog = true;
    this.selectedTopic = topic;
  }

  openDeleteTopicsDialog() {
    this.deleteTopicsDialog = true;
  }

  // Close dialog functions
  hideNewTopicDialog() {
    this.newTopicDialog = false;
    this.newTopicForm.reset();
  }

  hideEditTopicDialog() {
    this.editTopicDialog = false;
    this.editTopicForm.reset();
  }

  hideDeleteTopicDialog() {
    this.deleteTopicDialog = false;
    this.selectedTopic = null;
  }

  hideDeleteTopicsDialog() {
    this.deleteTopicsDialog = false;
  }

  // Dialog actions
  createNewTopic() {
    if (this.newTopicForm.valid) {
      this.studentsService
        .createTopic(this.newTopicForm.value as Student)
        .subscribe(() => {
          this.newTopicForm.reset();
          this.newTopicDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'New Student created'
          });
          this.getTopics(this.page);
        });
    }
  }

  deleteTopic() {
    if (this.selectedTopic.id) {
      this.studentsService.deleteTopic(this.selectedTopic.id).subscribe(() => {
        this.deleteTopicDialog = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Student deleted'
        });
        this.getTopics(this.page);
      });
    }
  }

  updateTopic() {
    if (this.editTopicForm.valid) {
      this.studentsService
        .updateTopic(this.editTopicForm.value as Student)
        .subscribe(() => {
          this.editTopicForm.reset();
          this.editTopicDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Student updated'
          });
          this.getTopics(this.page);
        });
    }
  }

  deleteTopics() {
    this.selectedTopics.forEach((e, index) => {
      if (e.id) {
        this.studentsService.deleteTopic(e.id).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Student deleted'
          });

          if (this.selectedTopics.length - 1 === index) {
            this.deleteTopicsDialog = false;
            this.getTopics(this.page);
            this.selectedTopics = [];
          }
        });
      }
    });
  }

  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
