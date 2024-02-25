import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups.component';
import { PrimeModule } from '../../shared/prime.module';
import { BreadcrumpService } from '../../shared/breadcrump.service';

@NgModule({
  declarations: [GroupsComponent],
  imports: [CommonModule, GroupsRoutingModule, PrimeModule],
  providers: [BreadcrumpService]
})
export class GroupsModule {}
