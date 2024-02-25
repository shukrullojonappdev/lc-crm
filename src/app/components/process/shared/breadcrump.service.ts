import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

enum homeworkRouteTypes {
  groups = 'groups',
  students = 'students',
  homeworks = 'homeworks'
}

@Injectable()
export class BreadcrumpService {
  homeRoute = '/process/groups';
  home = {
    icon: 'pi pi-flag',
    command: () => this.router.navigate([this.homeRoute])
  };

  items = [];

  constructor(private router: Router) {}

  getBreadcrumb() {
    this.items = [];

    const tempItems = this.router.url.split('/').splice(3);

    tempItems.forEach((item, index) => {
      if (homeworkRouteTypes[item]) {
        this.items.push({
          label: item,
          command: () => {
            this.router.navigate(
              [this.homeRoute].concat(tempItems.slice(0, index + 1))
            );
          }
        });
      }
    });
    return {
      home: this.home,
      items: this.items
    };
  }
}
