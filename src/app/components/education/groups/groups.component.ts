import { Component } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Group } from 'src/app/api/group';
import { GroupsService } from 'src/app/service/groups.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss'
})
export class GroupsComponent {
  newGroupDialog: boolean = false;
  editGroupDialog: boolean = false;
  deleteGroupDialog: boolean = false;
  deleteGroupsDialog: boolean = false;
  selectedGroup: Group | null = null;
  selectedGroups: Group[] = [];
  groups: Group[] = [];
  loading = true;
  cols: any[] = [];

  // * Paginator values
  page: number = 1;
  totalRecords = 0;

  newGroupForm = this.fb.group({
    title: ['', Validators.required],
    descriptions: ['']
  });

  editGroupForm = this.fb.group({
    id: ['', Validators.required],
    title: ['', Validators.required],
    descriptions: ['']
  });

  constructor(
    private groupsService: GroupsService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getGroups(this.page);
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'title', header: 'Title' }
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
    this.selectedGroups = [];
  }

  // Open dialog functions
  openNewGroupDialog() {
    this.newGroupDialog = true;
  }

  openEditGroupDialog(Group: Group) {
    this.editGroupDialog = true;
    this.editGroupForm.setValue(Group);
  }

  openDeleteGroupDialog(Group: Group) {
    this.deleteGroupDialog = true;
    this.selectedGroup = Group;
  }

  openDeleteGroupsDialog() {
    this.deleteGroupsDialog = true;
    console.log(this.selectedGroups);
  }

  // Close dialog functions
  hideNewGroupDialog() {
    this.newGroupDialog = false;
    this.newGroupForm.reset();
  }

  hideEditGroupDialog() {
    this.editGroupDialog = false;
    this.editGroupForm.reset();
  }

  hideDeleteGroupDialog() {
    this.deleteGroupDialog = false;
    this.selectedGroup = null;
  }

  hideDeleteGroupsDialog() {
    this.deleteGroupsDialog = false;
  }

  // Dialog actions
  createNewGroup() {
    if (this.newGroupForm.valid) {
      this.groupsService
        .createGroup(this.newGroupForm.value as Group)
        .subscribe(() => {
          this.newGroupForm.reset();
          this.newGroupDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'New Group created'
          });
          this.getGroups(this.page);
        });
    }
  }

  deleteGroup() {
    if (this.selectedGroup.id) {
      this.groupsService.deleteGroup(this.selectedGroup.id).subscribe(() => {
        this.deleteGroupDialog = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Group deleted'
        });
        this.getGroups(this.page);
      });
    }
  }

  updateGroup() {
    if (this.editGroupForm.valid) {
      this.groupsService
        .updateGroup(this.editGroupForm.value as Group)
        .subscribe(() => {
          this.editGroupForm.reset();
          this.editGroupDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Group updated'
          });
          this.getGroups(this.page);
        });
    }
  }

  deleteGroups() {
    this.selectedGroups.forEach((e, index) => {
      if (e.id) {
        this.groupsService.deleteGroup(e.id).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Group deleted'
          });

          if (this.selectedGroups.length - 1 === index) {
            this.deleteGroupsDialog = false;
            this.getGroups(this.page);
            this.selectedGroups = [];
          }
        });
      }
    });
  }

  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
