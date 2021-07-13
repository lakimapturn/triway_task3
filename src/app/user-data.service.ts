import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserDataService {
  private userDataSource = new BehaviorSubject<UserInfo[]>([]);
  userData = this.userDataSource.asObservable();
  arr: Array<UserInfo> = [];

  private databaseValues= new BehaviorSubject<Object>([]);
  formValues = this.databaseValues.asObservable();
  form: Array<UserInfo>=[];

  constructor(private http: HttpClient) {
    this.arr = localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')): [];
    this.formValues = this.http.get('http://localhost:8080/');
  }

  getAllUserInfo() {
    return this.userDataSource
  }

  postUserInfo(info) {
    this.http.post('http://localhost:8080/post', info, {
        headers: new HttpHeaders({
          'Content-type': 'application/json'
        })
      })
      .toPromise()
      .then(res => this.form.push(res as UserInfo));
      console.log(this.form);
  }

  getUserInfo(id) {
    return this.userDataSource[id];
  }

  addUserInfo(info: UserInfo) {
    this.arr.push(info)
    this.userDataSource.next(this.arr);
    localStorage.setItem("userInfo", JSON.stringify(this.arr))
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