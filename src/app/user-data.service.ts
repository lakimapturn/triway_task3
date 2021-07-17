import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {concatMap, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserDataService {
  private userDataSource = new BehaviorSubject<UserInfo[]>([]);
  userData = this.userDataSource.asObservable();
  arr: Array<UserInfo> = [];

  private databaseValues= new BehaviorSubject<any>([]);
  formValues = this.databaseValues.asObservable();
  form: any;

  constructor(private http: HttpClient) {
    this.http.get('http://localhost:8080/').toPromise().then(val => {
      this.form = val;
      this.databaseValues.next(this.form);
    });
    
  }

  getAllUserInfo() : any {
    return this.http.get('http://localhost:8080/').toPromise().then(val => val);
  }

  deleteUserInfo(info): any {
    return(this.http.delete('http://localhost:8080/user-info/' + info.id).pipe(concatMap(async (data) => this.getAllUserInfo())));
  }

  getUserInfo(id) : any {
    return Promise.resolve(this.http.get('http://localhost:8080/user-info/'+id).toPromise());
  }

  addUserInfo(info: UserInfo) {
    this.http.post('http://localhost:8080/user-info', info).toPromise().then(formValues => {
      this.form = formValues;
      this.databaseValues.next(this.form);
    })
  }

  editUserInfo(info: UserInfo, id: number) {
    this.http.post('http://localhost:8080/user-info/'+id, info).toPromise().then(formValues => {
      this.form = formValues;
      this.databaseValues.next(this.form);
    })
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