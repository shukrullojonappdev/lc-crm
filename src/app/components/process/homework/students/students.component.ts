import { Component, OnInit } from '@angular/core';
import { BreadcrumpService } from '../shared/breadcrump.service';
import { GroupsService } from 'src/app/service/groups.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit {
  home: any;
  items: any;
  students: any[] = [];
  loading = true;
  cols: any[] = [];
  groupId: string;

  constructor(
    private breadcrumpService: BreadcrumpService,
    private groupsService: GroupsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initBreadcrumb();
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'full_name', header: 'Fullname' },
      { field: 'phone', header: 'Phone number' }
    ];
    this.groupId = this.route.snapshot.params['groupId'];
    this.getGroupStudents(this.groupId);
  }

  initBreadcrumb() {
    const { home, items } = this.breadcrumpService.getBreadcrumb();
    this.home = home;
    this.items = items;
  }

  getGroupStudents(groupId) {
    this.groupsService.getGroupStudents(groupId).subscribe((res: any) => {
      this.students = res.student;
      this.loading = false;
    });
  }

  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  onRowSelect(e: any) {
    this.router.navigate([
      '/process/groups',
      this.groupId,
      'students',
      e.data.id,
      'homeworks'
    ]);
  }
}
