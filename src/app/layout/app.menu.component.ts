import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];
  model1: any[] = [];

  constructor(public layoutService: LayoutService) {}

  ngOnInit() {
    this.model1 = [
      {
        label: $localize`Home`,
        forRole: ['admin', 'worker', 'student', 'teacher'],
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
        forRole: ['admin', 'worker'],
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
        forRole: ['admin', 'worker'],
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
            icon: 'pi pi-fw pi-flag',
            routerLink: ['/education/homeworks']
          }
        ]
      },
      {
        label: $localize`Places`,
        forRole: ['admin', 'worker'],
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
        label: $localize`Teacher`,
        forRole: ['teacher'],
        items: [
          {
            label: $localize`Groups`,
            icon: 'pi pi-fw pi-users',
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
        forRole: ['student'],
        items: [
          {
            label: $localize`Groups`,
            icon: 'pi pi-fw pi-users',
            routerLink: ['/student/groups']
          },
          {
            label: $localize`Timetable`,
            icon: 'pi pi-fw pi-calendar',
            routerLink: ['/student/timetable']
          }
        ]
      }
    ];

    this.checkToRole();
  }

  checkToRole() {
    let user = null;
    let interval = setInterval(() => {
      user = localStorage.getItem('currentUser')
        ? JSON.parse(localStorage.getItem('currentUser'))
        : JSON.parse(sessionStorage.getItem('currentUser'));

      if (user) {
        clearInterval(interval);
        const tempArr = new Set();
        this.model1.forEach((e) => {
          e.forRole.forEach((a: any) => {
            if (user.hasOwnProperty(`${a}`)) tempArr.add(e);
          });
        });

        this.model = [...tempArr];
      }
    }, 200);
  }
}
