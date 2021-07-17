import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService, UserInfo } from '../user-data.service';

@Component({
  selector: 'app-user-info-table',
  templateUrl: './user-info-table.component.html',
  styleUrls: ['./user-info-table.component.css'],
})
export class UserInfoTableComponent{
  tableValues: UserInfo[];

  constructor(private userDService: UserDataService, private router: Router) {
    this.userDService.formValues.subscribe(data=> this.tableValues = data);
  }

  edit(value)
  {
    this.router.navigate(['/user-form', value.id]);
  }

  delete(value)
  {
    this.userDService.deleteUserInfo(value).subscribe(data => {
      this.tableValues = data;
    });
  }
}
