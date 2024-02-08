import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService, ScrollerOptions } from 'primeng/api';
import { Group, GroupHome } from 'src/app/api/group';
import { Topic } from 'src/app/api/topic';
import { GroupHomesService } from 'src/app/service/group-homes.service';
import { GroupsService } from 'src/app/service/groups.service';
import { TopicsService } from 'src/app/service/topics.service';

@Component({
  selector: 'app-homeworks',
  templateUrl: './homeworks.component.html',
  styleUrl: './homeworks.component.scss'
})
export class HomeworksComponent {
  newGroupHomeDialog: boolean = false;
  editGroupHomeDialog: boolean = false;
  deleteGroupHomeDialog: boolean = false;
  deleteGroupHomesDialog: boolean = false;
  selectedGroupHome: GroupHome | null = null;
  selectedGroupHomes: GroupHome[] = [];
  groupHomes: GroupHome[] = [];
  loading = true;
  cols: any[] = [];

  // * Dropdown values

  // * Group
  groups: Group[];
  groupsPage: number;
  groupsLoading: boolean;
  groupsVScroll: any[];
  groupsVScrollLoads: number;
  groupsOptions: ScrollerOptions = {
    delay: 250,
    showLoader: true,
    lazy: true,
    onLazyLoad: this.onGroupsLazyLoad.bind(this)
  };

  // * Group
  topics: Topic[];
  topicsPage: number;
  topicsLoading: boolean;
  topicsVScroll: any[];
  topicsVScrollLoads: number;
  topicsOptions: ScrollerOptions = {
    delay: 250,
    showLoader: true,
    lazy: true,
    onLazyLoad: this.onTopicsLazyLoad.bind(this)
  };

  // * Paginator values
  page: number = 1;
  totalRecords = 0;

  newGroupHomeForm = this.fb.group({
    group: [' ', [Validators.required, Validators.pattern(/\d/)]],
    topic: [' ', [Validators.required, Validators.pattern(/\d/)]],
    is_active: [''],
    descriptions: [' ']
  });

  editGroupHomeForm = this.fb.group({
    id: ['', Validators.required],
    group: [' ', [Validators.required, Validators.pattern(/\d/)]],
    topic: [' ', [Validators.required, Validators.pattern(/\d/)]],
    is_active: [''],
    descriptions: [' ']
  });

  constructor(
    private groupHomesService: GroupHomesService,
    private groupsService: GroupsService,
    private topicsService: TopicsService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getGroupHomes(this.page);
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'course', header: 'Group' },
      { field: 'topic', header: 'Topic' }
    ];
  }

  onGroupsLazyLoad(e: any) {
    const { first, last } = e;
    if (!this.groupsLoading) this.groupsVScrollLoads++;
    if (this.groupsVScrollLoads === this.groupsPage) {
      this.getGroups(this.groupsPage);
    }

    const items = [...this.groupsVScroll];
    for (let i = first; i < last; i++) {
      items[i] = { ...this.groups[i] };
    }
    this.groupsVScroll = items;
  }

  onTopicsLazyLoad(e: any) {
    const { first, last } = e;
    if (!this.topicsLoading) this.topicsVScrollLoads++;
    if (this.topicsVScrollLoads === this.topicsPage) {
      this.getTopics(this.topicsPage);
    }

    const items = [...this.topicsVScroll];
    for (let i = first; i < last; i++) {
      items[i] = { ...this.topics[i] };
    }
    this.topicsVScroll = items;
  }

  getGroups(page: number) {
    this.groupsLoading = true;
    this.groupsService.getGroups(page).subscribe((res) => {
      if (this.groupsVScroll.length === 0) {
        const tempEmptyArr = [];
        for (let i = 0; i < res.count; i++) {
          tempEmptyArr.push({
            id: '',
            title: '',
            descriptions: ''
          });
        }
        this.groupsVScroll = tempEmptyArr;
      }

      if (this.groups.length !== res.count) {
        const tempgroups = [...this.groups];
        res.results.forEach((e: any, i: number) => {
          tempgroups[(this.groupsPage - 1) * 10 + i] = e;
        });

        this.groups = tempgroups;
      }

      if (this.groupsPage * 10 < res.count) {
        this.groupsPage++;
      }
    });
    this.groupsLoading = false;
  }

  getTopics(page: number) {
    this.topicsLoading = true;
    this.topicsService.getTopics(page).subscribe((res) => {
      if (this.topicsVScroll.length === 0) {
        const tempEmptyArr = [];
        for (let i = 0; i < res.count; i++) {
          tempEmptyArr.push({
            id: '',
            title: '',
            descriptions: ''
          });
        }
        this.topicsVScroll = tempEmptyArr;
      }

      if (this.topics.length !== res.count) {
        const tempTopics = [...this.topics];
        res.results.forEach((e: any, i: number) => {
          tempTopics[(this.topicsPage - 1) * 10 + i] = e;
        });

        this.topics = tempTopics;
      }

      if (this.topicsPage * 10 < res.count) {
        this.topicsPage++;
      }
    });
    this.topicsLoading = false;
  }

  getGroupHomes(page: number) {
    this.groupHomesService.getGroupHomes(page).subscribe((res: any) => {
      this.totalRecords = res.count;
      this.groupHomes = res.results;
      this.loading = false;
    });
  }

  onPageChange(e: any) {
    this.loading = true;
    this.getGroupHomes(e.page + 1);
    this.selectedGroupHomes = [];
  }

  // Open dialog functions
  openNewGroupHomeDialog() {
    this.newGroupHomeDialog = true;
    this.groups = [];
    this.groupsVScroll = [];
    this.groupsPage = 1;
    this.groupsVScrollLoads = 1;
    this.topics = [];
    this.topicsVScroll = [];
    this.topicsPage = 1;
    this.topicsVScrollLoads = 1;
    this.getTopics(this.topicsPage);
    this.getGroups(this.groupsPage);
  }

  openEditGroupHomeDialog(topic: GroupHome) {
    this.editGroupHomeDialog = true;
    this.groups = [];
    this.groupsVScroll = [];
    this.groupsPage = 1;
    this.groupsVScrollLoads = 1;
    this.topics = [];
    this.topicsVScroll = [];
    this.topicsPage = 1;
    this.topicsVScrollLoads = 1;
    this.getTopics(this.topicsPage);
    this.getGroups(this.groupsPage);
    this.editGroupHomeForm.patchValue(topic as any);
  }

  openDeleteGroupHomeDialog(topic: GroupHome) {
    this.deleteGroupHomeDialog = true;
    this.selectedGroupHome = topic;
  }

  openDeleteGroupHomesDialog() {
    this.deleteGroupHomesDialog = true;
  }

  // Close dialog functions
  hideNewGroupHomeDialog() {
    this.newGroupHomeDialog = false;
    this.newGroupHomeForm.reset();
  }

  hideEditGroupHomeDialog() {
    this.editGroupHomeDialog = false;
    this.editGroupHomeForm.reset();
  }

  hideDeleteGroupHomeDialog() {
    this.deleteGroupHomeDialog = false;
    this.selectedGroupHome = null;
  }

  hideDeleteGroupHomesDialog() {
    this.deleteGroupHomesDialog = false;
  }

  // Dialog actions
  createNewTopic() {
    if (this.newGroupHomeForm.valid) {
      this.groupHomesService
        .createGroupHome(this.newGroupHomeForm.value as any)
        .subscribe(() => {
          this.newGroupHomeForm.reset();
          this.newGroupHomeDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'New GroupHome created'
          });
          this.getGroupHomes(this.page);
        });
    }
  }

  deleteTopic() {
    if (this.selectedGroupHome.id) {
      this.groupHomesService
        .deleteGroupHome(this.selectedGroupHome.id)
        .subscribe(() => {
          this.deleteGroupHomeDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'GroupHome deleted'
          });
          this.getGroupHomes(this.page);
        });
    }
  }

  updateTopic() {
    if (this.editGroupHomeForm.valid) {
      this.groupHomesService
        .updateGroupHome(this.editGroupHomeForm.value as any)
        .subscribe(() => {
          this.editGroupHomeForm.reset();
          this.editGroupHomeDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'GroupHome updated'
          });
          this.getGroupHomes(this.page);
        });
    }
  }

  deleteGroupHomes() {
    this.selectedGroupHomes.forEach((e, index) => {
      if (e.id) {
        this.groupHomesService.deleteGroupHome(e.id).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'GroupHome deleted'
          });

          if (this.selectedGroupHomes.length - 1 === index) {
            this.deleteGroupHomesDialog = false;
            this.getGroupHomes(this.page);
            this.selectedGroupHomes = [];
          }
        });
      }
    });
  }

  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
