import { Component, OnInit } from '@angular/core';
import { BreadcrumpService } from '../shared/breadcrump.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss'
})
export class GroupsComponent implements OnInit {
  home: any;
  items: any[] = [];

  groups: any[] = [];

  constructor(private breadcrumpService: BreadcrumpService) {}

  ngOnInit() {
    this.initBreadcrumb();
  }

  initBreadcrumb() {
    const { home, items } = this.breadcrumpService.getBreadcrumb();
    this.home = home;
    this.items = items;
  }
}
