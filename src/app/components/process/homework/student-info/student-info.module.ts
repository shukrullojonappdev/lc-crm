import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentInfoRoutingModule } from './student-info-routing.module';
import { StudentInfoComponent } from './student-info.component';
import { PrimeModule } from '../shared/prime.module';
import { BreadcrumpService } from '../shared/breadcrump.service';
import { HttpClientModule } from '@angular/common/http';

import { HighlightModule } from 'ngx-highlightjs';
import { SidebarModule } from 'primeng/sidebar';
import { TreeModule } from 'primeng/tree';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { FormsModule } from '@angular/forms';
import { SplitterModule } from 'primeng/splitter';

@NgModule({
  declarations: [StudentInfoComponent],
  imports: [
    CommonModule,
    FormsModule,
    StudentInfoRoutingModule,
    PrimeModule,
    TreeModule,
    SidebarModule,
    MenubarModule,
    InputTextModule,
    HttpClientModule,
    HighlightModule,
    SplitterModule
  ],
  providers: [BreadcrumpService]
})
export class StudentInfoModule {}
