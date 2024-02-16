import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/api/group';
import { GroupsService } from 'src/app/service/groups.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss'
})
export class GroupsComponent implements OnInit {
  items: any;
  groups: Group[] = [];
  loading = true;
  cols: any[] = [];
  user: any;

  constructor(private groupsService: GroupsService, private router: Router) {}

  ngOnInit() {
    this.user =
      JSON.parse(localStorage.getItem('currentUser')) ||
      JSON.parse(sessionStorage.getItem('currentUser'));
    this.getGroups();
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'title', header: 'Title' },
      { field: 'start_date', header: 'Start date' },
      { field: 'end_date', header: 'End date' }
    ];
  }

  getGroups() {
    console.log(this.user);

    this.groupsService
      .getGroupsByStudentId(this.user.user.id)
      .subscribe((res: any) => {
        this.groups = res.results;
        this.loading = false;
      });
  }

  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  onRowSelect(e: any) {
    this.router.navigate(['/student/homeworks', e.data.id]);
  }
}
