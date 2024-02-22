import { Component, OnInit } from '@angular/core';
import { BreadcrumpService } from '../shared/breadcrump.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {
  home: any;
  items: any;
  groupId: any;
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
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.groupId = this.route.snapshot.params['groupId'];
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
}
