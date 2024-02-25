import { Component, OnInit } from '@angular/core';
import { BreadcrumpService } from '../../shared/breadcrump.service';
import { HomeworksService } from 'src/app/service/homeworks.service';
import { Homework } from 'src/app/api/homework';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from 'src/app/service/students.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent implements OnInit {
  home: any;
  items: any[] = [];

  homeworks: any[];
  loading = true;
  cols: any[] = [];
  studentId: string;
  groupId: string;
  student: any;

  constructor(
    private breadcrumpService: BreadcrumpService,
    private homeworksService: HomeworksService,
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentsService
  ) {}

  ngOnInit() {
    const { studentId, groupId } = this.route.snapshot.params;

    this.studentId = studentId;
    this.groupId = groupId;

    this.studentService.getStudent(studentId).subscribe((res: any) => {
      this.student = res;
    });

    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'repository', header: 'Repository' },
      { field: 'branch', header: 'Branch' }
    ];

    this.initBreadcrumb();
    this.homeworksService
      .getHomeworksByStudentId(studentId)
      .subscribe((res: any) => {
        this.loading = false;
        this.homeworks = res;
      });
  }

  initBreadcrumb() {
    const { home, items } = this.breadcrumpService.getBreadcrumb();
    this.home = home;
    this.items = items;
  }

  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  onRowSelect(e: any) {
    this.router.navigate(
      [
        '/process/groups',
        this.groupId,
        'students',
        this.studentId,
        'homeworks',
        e.data.id
      ],
      {
        queryParams: {
          user: this.student.git_username,
          repo: e.data.repository,
          sha: e.data.branch,
          token: this.student.git_token
        }
      }
    );
  }
}
