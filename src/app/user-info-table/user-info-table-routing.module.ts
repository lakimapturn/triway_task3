import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserInfoTableComponent } from './user-info-table.component';

const routes: Routes = [
  {path: '', component: UserInfoTableComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserInfoTableRoutingModule { }
