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

  // * Paginator values
  page: number = 1;
  totalRecords = 0;

  constructor(private groupsService: GroupsService, private router: Router) {}

  ngOnInit() {
    this.getGroups(this.page);
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'title', header: 'Title' },
      { field: 'start_date', header: 'Start date' },
      { field: 'end_date', header: 'End date' }
    ];
  }

  getGroups(page: number) {
    this.groupsService.getGroups(page).subscribe((res: any) => {
      this.totalRecords = res.count;
      this.groups = res.results;
      this.loading = false;
    });
  }

  onPageChange(e: any) {
    this.loading = true;
    this.getGroups(e.page + 1);
  }

  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  onRowSelect(e: any) {
    this.router.navigate(['/process/schedule/groups', e.data.id]);
  }
}
