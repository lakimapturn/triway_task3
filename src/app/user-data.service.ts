import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserDataService {
  private userDataSource = new BehaviorSubject<UserInfo[]>([]);
  userData = this.userDataSource.asObservable();
  arr: Array<UserInfo> = [];

  private editFormValues = new BehaviorSubject<Object>([]);
  formValues = this.editFormValues.asObservable();
  
  constructor() {
    this.arr = localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')): [];
  }

  getAllUserInfo() {
    return this.userDataSource
  }

  getUserInfo(id) {
    return this.userDataSource[id];
  }

  addUserInfo(info: UserInfo) {
    this.arr.push(info)
    this.userDataSource.next(this.arr);
    localStorage.setItem("userInfo", JSON.stringify(this.arr))
  }

  stageEdit(formValue)
  {
    this.editFormValues.next(formValue);
  }

  editUserInfo(info: UserInfo, id: number) {
    this.arr.splice(id, 1, info);
    this.userDataSource.next(this.arr);
    localStorage.setItem("userInfo", JSON.stringify(this.arr))
  }
}

export class UserInfo {
  fullname: string;
  username: string;
  password: string;
  phone_number: string;
  send_email: boolean;
  email: string;
  address: string;
  contacts: number;
  valid_period: string;
  app_id: string;
  capacity: number;
  postscript: string;
  background: boolean;
}