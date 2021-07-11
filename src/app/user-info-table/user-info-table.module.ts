import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoTableComponent } from './user-info-table.component';

import { UserInfoTableRoutingModule } from './user-info-table-routing.module';


@NgModule({
  declarations: [UserInfoTableComponent],
  imports: [
    CommonModule,
    UserInfoTableRoutingModule
  ]
})
export class UserInfoTableModule { }
