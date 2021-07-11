import { Component, OnInit } from '@angular/core';
import { UserDataService, UserInfo } from '../user-data.service';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-info-table',
  templateUrl: './user-info-table.component.html',
  styleUrls: ['./user-info-table.component.css'],
})
export class UserInfoTableComponent implements OnInit {
  tableValues: UserInfo[];

  constructor(private userDService: UserDataService) {
    this.tableValues = localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):[];
  }

  ngOnInit(){
    this.userDService.userData.subscribe(tableValues => tableValues[0]?this.tableValues.splice(0, this.tableValues.length, ...tableValues):this.tableValues);
    //this.userDService.userData.subscribe(tableValues => tableValues[0]?(this.tableValues.push(tableValues[tableValues.length-1])):this.tableValues);
  }

  edit(value)
  {
    value.id = this.tableValues.indexOf(value);
    this.userDService.stageEdit(value);
    localStorage.setItem('userInfo', JSON.stringify(this.tableValues)); // updating localStorage
  }

  delete(value)
  {
    if(this.tableValues.indexOf(value) == 0)
     this.tableValues.shift();
    else if (this.tableValues.indexOf(value) == this.tableValues.length - 1)
     this.tableValues.pop()
    else
    this.tableValues.splice(this.tableValues.indexOf(value), 1);
    localStorage.setItem('userInfo', JSON.stringify(this.tableValues)); // updating localStorage
  }
}
