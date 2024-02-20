import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeworksRoutingModule } from './homeworks-routing.module';
import { HomeworksComponent } from './homeworks.component';
import { PrimeModule } from '../shared/prime.module';
import { BreadcrumpService } from '../shared/breadcrump.service';

@NgModule({
  declarations: [HomeworksComponent],
  imports: [CommonModule, HomeworksRoutingModule, PrimeModule],
  providers: [BreadcrumpService]
})
export class HomeworksModule {}
