import { Component, OnInit } from '@angular/core';
import { BreadcrumpService } from '../shared/breadcrump.service';
import { GroupHomesService } from 'src/app/service/group-homes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-homeworks',
  templateUrl: './homeworks.component.html',
  styleUrl: './homeworks.component.scss'
})
export class HomeworksComponent implements OnInit {
  home: any;
  items: any;
  groupHomes: any[] = [];
  loading = true;
  cols: any[] = [];
  groupId: string;

  constructor(
    private breadcrumpService: BreadcrumpService,
    private groupHomesService: GroupHomesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initBreadcrumb();
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'course', header: 'Course' },
      { field: 'topic', header: 'Topic' }
    ];
    this.groupId = this.route.snapshot.params['groupId'];
    this.getGroupHomes(this.groupId);
  }

  initBreadcrumb() {
    const { home, items } = this.breadcrumpService.getBreadcrumb();
    this.home = home;
    this.items = items;
  }

  getGroupHomes(groupId) {
    this.groupHomesService
      .getGHomeworksByGroup(groupId)
      .subscribe((res: any) => {
        res.filter((e) => {
          if (e.group == groupId) this.groupHomes.push(e);
        });

        this.loading = false;
      });
  }

  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  onRowSelect(e: any) {
    this.router.navigate([
      '/student/groups',
      this.groupId,
      'homeworks',
      e.data.id,
    ]);
  }
}
