import { Component } from '@angular/core';
import { Course } from 'src/app/api/course';

import { MessageService } from 'primeng/api';
import { CoursesService } from 'src/app/service/courses.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  courseDialog: boolean = false;
  deleteProductDialog: boolean = false;
  deleteProductsDialog: boolean = false;
  products: any[] = [];
  course: Course;
  selectedProducts: any[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  courses: Course[] = [];

  constructor(
    private productService: ProductService,
    private coursesService: CoursesService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.productService.getProducts().then((data) => (this.products = data));
    this.coursesService.getCourses(1).subscribe((res: any) => {
      this.courses = res.results;
    });

    this.cols = [
      { field: 'ID', header: 'any' },
      { field: 'title', header: 'Title' }
    ];

    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' }
    ];
  }

  openNew() {
    this.submitted = false;
    this.courseDialog = true;
  }

  deleteSelectedProducts() {
    this.deleteProductsDialog = true;
  }

  editCourse(course: any) {
    console.log(course);
    this.courseDialog = true;
  }

  deleteCourse(product: any) {
    this.deleteProductDialog = true;
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    this.products = this.products.filter(
      (val) => !this.selectedProducts.includes(val)
    );
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Products Deleted',
      life: 3000
    });
    this.selectedProducts = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'any Deleted',
      life: 3000
    });
  }

  hideDialog() {
    this.courseDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
