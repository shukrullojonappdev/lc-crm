import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BreadcrumbModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    PaginatorModule
  ],
  exports: [
    BreadcrumbModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    PaginatorModule
  ],
  providers: []
})
export class PrimeModule {}
