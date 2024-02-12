import { Component, OnInit } from '@angular/core';
import { BreadcrumpService } from '../shared/breadcrump.service';
import { HomeworksService } from 'src/app/service/homeworks.service';
import { Homework } from 'src/app/api/homework';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent implements OnInit {
  home: any;
  items: any[] = [];

  homeworks: Homework[];

  constructor(
    private breadcrumpService: BreadcrumpService,
    private homeworksService: HomeworksService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const { studentId } = this.route.snapshot.params;
    this.initBreadcrumb();
    this.homeworksService
      .getHomeworksByStudentId(studentId)
      .subscribe((res) => {
        console.log(res);
      });
  }

  initBreadcrumb() {
    const { home, items } = this.breadcrumpService.getBreadcrumb();
    this.home = home;
    this.items = items;
  }
}
