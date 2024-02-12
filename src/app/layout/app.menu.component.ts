import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];

  constructor(public layoutService: LayoutService) {}

  ngOnInit() {
    this.model = [
      {
        label: $localize`Home`,
        items: [
          {
            label: $localize`Dashboard`,
            icon: 'pi pi-fw pi-home',
            routerLink: ['/']
          }
        ]
      },
      {
        label: $localize`People`,
        items: [
          {
            label: $localize`Workers`,
            icon: 'pi pi-fw pi-id-card',
            routerLink: ['/people/workers']
          },
          {
            label: $localize`Students`,
            icon: 'pi pi-fw pi-user',
            routerLink: ['/people/students']
          }
        ]
      },
      {
        label: $localize`Education`,
        items: [
          {
            label: $localize`Courses`,
            icon: 'pi pi-fw pi-book',
            routerLink: ['/education/courses']
          },
          {
            label: $localize`Topics`,
            icon: 'pi pi-fw pi-bookmark',
            routerLink: ['/education/topics']
          },
          {
            label: $localize`Groups`,
            icon: 'pi pi-fw pi-users',
            routerLink: ['/education/groups']
          },
          {
            label: $localize`Timetable`,
            icon: 'pi pi-fw pi-calendar',
            routerLink: ['/education/timetable']
          },
          {
            label: $localize`Homeworks`,
            icon: 'pi pi-fw pi-calendar',
            routerLink: ['/education/homeworks']
          }
        ]
      },
      {
        label: $localize`Places`,
        items: [
          {
            label: $localize`Departments`,
            icon: 'pi pi-fw pi-building',
            routerLink: ['/places/departments']
          },
          {
            label: $localize`Rooms`,
            icon: 'pi pi-fw pi-box',
            routerLink: ['/places/rooms']
          }
        ]
      },
      {
        label: $localize`Process`,
        items: [
          {
            label: $localize`Groups`,
            icon: 'pi pi-fw pi-flag',
            routerLink: ['/process/groups']
          },
          {
            label: $localize`Schedule`,
            icon: 'pi pi-fw pi-calendar',
            routerLink: ['/process/schedule']
          }
        ]
      },
      {
        label: $localize`Student`,
        items: [
          {
            label: $localize`Timetable`,
            icon: 'pi pi-fw pi-building',
            routerLink: ['/student/timetable']
          },
          {
            label: $localize`Homeworks`,
            icon: 'pi pi-fw pi-box',
            routerLink: ['/student/homeworks']
          }
        ]
      }
    ];
  }
}
