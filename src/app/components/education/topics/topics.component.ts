import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService, ScrollerOptions } from 'primeng/api';
import { Course } from 'src/app/api/course';
import { Topic } from 'src/app/api/topic';

import { TopicsService } from 'src/app/service/topics.service';
import { CoursesService } from 'src/app/service/courses.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.scss'
})
export class TopicsComponent {
  newTopicDialog: boolean = false;
  editTopicDialog: boolean = false;
  deleteTopicDialog: boolean = false;
  deleteTopicsDialog: boolean = false;
  selectedTopic: Topic | null = null;
  selectedTopics: Topic[] = [];
  topics: Topic[] = [];
  loading = true;
  cols: any[] = [];

  // * Dropdown values
  // * Course
  courses: Course[] = [];
  coursesTotal = 0;
  coursesPage = 1;
  options: ScrollerOptions = {
    delay: 250,
    showLoader: true,
    lazy: true,
    onLazyLoad: this.onLazyLoad.bind(this)
  };

  // * Paginator values
  page: number = 1;
  totalRecords = 0;

  newTopicForm = this.fb.group({
    title: ['', Validators.required],
    course: ['', Validators.required],
    descriptions: ['']
  });

  editTopicForm = this.fb.group({
    id: ['', Validators.required],
    title: ['', Validators.required],
    course: ['', Validators.required],
    descriptions: ['']
  });

  constructor(
    private topicsService: TopicsService,
    private coursesService: CoursesService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getTopics(this.page);
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'title', header: 'Title' },
      { field: 'course', header: 'Course' }
    ];

    // * Getting dropdown values
    this.coursesService.getCourses(1).subscribe((res) => {
      for (let i = 0; i < res.count; i++) {
        this.courses.push({
          id: '',
          title: '',
          descriptions: ''
        });
      }
    });
  }

  onLazyLoad(e: any) {
    this.log(e);
    const { first, last } = e;
    if (first === 0 && this.coursesPage === 1) {
      this.getCourses(this.coursesPage);
    }
    if (first % 10 === 2 && last % 10 === 0) {
      this.getCourses(this.coursesPage);
      console.log(this.courses);
    }
  }

  log(e: any) {
    console.log(e);
  }

  getCourses(page: number) {
    this.coursesService.getCourses(page).subscribe((res) => {
      const start = (page - 1) * 10;
      res.results.forEach((e, i) => {
        this.courses[i + start] = e;
      });
      this.coursesPage++;
    });
  }

  getTopics(page: number) {
    this.topicsService.getTopics(page).subscribe((res: any) => {
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
  }

  openEditTopicDialog(topic: Topic) {
    this.editTopicDialog = true;
    this.editTopicForm.setValue(topic as any);
  }

  openDeleteTopicDialog(topic: Topic) {
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
      this.topicsService
        .createTopic(this.newTopicForm.value as Topic)
        .subscribe(() => {
          this.newTopicForm.reset();
          this.newTopicDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'New Topic created'
          });
          this.getTopics(this.page);
        });
    }
  }

  deleteTopic() {
    if (this.selectedTopic.id) {
      this.topicsService.deleteTopic(this.selectedTopic.id).subscribe(() => {
        this.deleteTopicDialog = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Topic deleted'
        });
        this.getTopics(this.page);
      });
    }
  }

  updateTopic() {
    if (this.editTopicForm.valid) {
      this.topicsService
        .updateTopic(this.editTopicForm.value as Topic)
        .subscribe(() => {
          this.editTopicForm.reset();
          this.editTopicDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Topic updated'
          });
          this.getTopics(this.page);
        });
    }
  }

  deleteTopics() {
    this.selectedTopics.forEach((e, index) => {
      if (e.id) {
        this.topicsService.deleteTopic(e.id).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Topic deleted'
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
