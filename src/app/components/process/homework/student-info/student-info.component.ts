import { Component, OnInit } from '@angular/core';
import { BreadcrumpService } from '../shared/breadcrump.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrl: './student-info.component.scss'
})
export class StudentInfoComponent implements OnInit {
  home: any;
  items: any[] = [];

  constructor(
    private breadcrumpService: BreadcrumpService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initBreadcrumb();

    console.log(this.route.snapshot.params);
  }

  initBreadcrumb() {
    const { home, items } = this.breadcrumpService.getBreadcrumb();
    this.home = home;
    this.items = items;
  }
}
