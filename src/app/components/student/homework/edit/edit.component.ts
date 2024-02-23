import { Component, OnInit } from '@angular/core';
import { BreadcrumpService } from '../shared/breadcrump.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { HomeworksService } from 'src/app/service/homeworks.service';
import { AuthService } from 'src/app/service/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {
  home: any;
  items: any;
  student: any;
  hmId: any;

  addHomeworkForm = this.fb.group({
    groupHomeWork: ['', Validators.required],
    repository: ['', Validators.required],
    branch: ['', Validators.required],
    student: ['', Validators.required],
    is_active: ['', Validators.required],
    descriptions: ['']
  });

  constructor(
    private breadcrumpService: BreadcrumpService,
    private route: ActivatedRoute,
    private homeworksService: HomeworksService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.student =
      JSON.parse(localStorage.getItem('currentUser')) ||
      JSON.parse(sessionStorage.getItem('currentUser'));

    this.hmId = this.route.snapshot.params['hmId'];
    this.initBreadcrumb();
  }

  initBreadcrumb() {
    const { home, items } = this.breadcrumpService.getBreadcrumb();
    this.home = home;
    this.items = items;
    this.items.push({
      label: this.hmId
    });
  }

  addHomework() {
    this.addHomeworkForm.controls['groupHomeWork'].setValue(this.hmId);
    this.addHomeworkForm.controls['student'].setValue(this.student.user.id);
    if (!this.addHomeworkForm.valid) return;
    this.homeworksService
      .createHomework(this.addHomeworkForm.value as any)
      .subscribe(() => {
        this.addHomeworkForm.reset();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Homework successfully added'
        });
      });
  }
}
