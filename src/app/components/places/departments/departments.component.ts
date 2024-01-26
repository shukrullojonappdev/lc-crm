import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Department } from 'src/app/api/department';
import { DepartmentsService } from 'src/app/service/departments.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.scss'
})
export class DepartmentsComponent {
  newDepartmentDialog: boolean = false;
  editDepartmentDialog: boolean = false;
  deleteDepartmentDialog: boolean = false;
  deleteDepartmentsDialog: boolean = false;
  selectedDepartment: Department | null = null;
  selectedDepartments: Department[] = [];
  departments: Department[] = [];
  loading = true;
  cols: any[] = [];

  // * Paginator values
  page: number = 1;
  totalRecords = 0;

  newDepartmentForm = this.fb.group({
    title: ['', Validators.required],
    is_active: [false, Validators.required],
    descriptions: ['']
  });

  editDepartmentForm = this.fb.group({
    id: ['', Validators.required],
    title: ['', Validators.required],
    is_active: [false, Validators.required],
    descriptions: ['']
  });

  constructor(
    private departmentsService: DepartmentsService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getDepartments(this.page);
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'title', header: 'Title' },
      { field: 'is_active', header: 'Is active' }
    ];
  }

  getDepartments(page: number) {
    this.departmentsService.getDepartments(page).subscribe((res: any) => {
      this.totalRecords = res.count;
      this.departments = res.results;
      this.loading = false;
    });
  }

  onPageChange(e: any) {
    this.loading = true;
    this.getDepartments(e.page + 1);
    this.selectedDepartments = [];
  }

  // Open dialog functions
  openNewDepartmentDialog() {
    this.newDepartmentDialog = true;
  }

  openEditDepartmentDialog(department: Department) {
    this.editDepartmentDialog = true;
    this.editDepartmentForm.setValue(department);
  }

  openDeleteDepartmentDialog(department: Department) {
    this.deleteDepartmentDialog = true;
    this.selectedDepartment = department;
  }

  openDeleteDepartmentsDialog() {
    this.deleteDepartmentsDialog = true;
  }

  // Close dialog functions
  hideNewDepartmentDialog() {
    this.newDepartmentDialog = false;
    this.newDepartmentForm.reset();
  }

  hideEditDepartmentDialog() {
    this.editDepartmentDialog = false;
    this.editDepartmentForm.reset();
  }

  hideDeleteDepartmentDialog() {
    this.deleteDepartmentDialog = false;
    this.selectedDepartment = null;
  }

  hideDeleteDepartmentsDialog() {
    this.deleteDepartmentsDialog = false;
  }

  // Dialog actions
  createNewDepartment() {
    if (this.newDepartmentForm.valid) {
      this.departmentsService
        .createDepartment(this.newDepartmentForm.value as Department)
        .subscribe(() => {
          this.newDepartmentForm.reset();
          this.newDepartmentDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'New department created'
          });
          this.getDepartments(this.page);
        });
    }
  }

  deleteDepartment() {
    if (this.selectedDepartment.id) {
      this.departmentsService
        .deleteDepartment(this.selectedDepartment.id)
        .subscribe(() => {
          this.deleteDepartmentDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Department deleted'
          });
          this.getDepartments(this.page);
        });
    }
  }

  updateDepartment() {
    if (this.editDepartmentForm.valid) {
      this.departmentsService
        .updateDepartment(this.editDepartmentForm.value as Department)
        .subscribe(() => {
          this.editDepartmentForm.reset();
          this.editDepartmentDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Department updated'
          });
          this.getDepartments(this.page);
        });
    }
  }

  deleteDepartments() {
    this.selectedDepartments.forEach((e, index) => {
      if (e.id) {
        this.departmentsService.deleteDepartment(e.id).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Department deleted'
          });

          if (this.selectedDepartments.length - 1 === index) {
            this.deleteDepartmentsDialog = false;
            this.getDepartments(this.page);
            this.selectedDepartments = [];
          }
        });
      }
    });
  }

  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
