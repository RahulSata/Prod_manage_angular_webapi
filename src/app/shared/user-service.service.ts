import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Userclass } from './userclass.model';

interface SessionID {
  sessionID: String;
}

@Injectable({
  providedIn: 'root'
})

export class UserServiceService {
  formdata : Userclass ;
  readonly rootURL: "https://localhost:44309/api";
  constructor(private http: HttpClient) { }

  public validateUser(formdata : Userclass){
    return this.http.post<string>('https://localhost:44309/api/users/validateUser',formdata);
  }

  public AddUser(formdata:Userclass){
    console.log("In service"+formdata.UserId);
    return this.http.post('https://localhost:44309/api/users/PostUser',formdata,{responseType:'json'});
  }

}