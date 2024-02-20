import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups.component';

import { PrimeModule } from '../shared/prime.module';

@NgModule({
  declarations: [GroupsComponent],
  imports: [CommonModule, GroupsRoutingModule, PrimeModule],
  providers: []
})
export class GroupsModule {}
