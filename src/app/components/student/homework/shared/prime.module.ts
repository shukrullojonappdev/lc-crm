import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BreadcrumbModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    InputTextModule
  ],
  exports: [
    BreadcrumbModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    InputTextModule
  ],
  providers: []
})
export class PrimeModule {}
