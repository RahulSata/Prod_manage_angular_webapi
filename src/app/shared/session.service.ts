import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

interface SessionID {
  sessionID: String;
  
}

@Injectable({
  providedIn: 'root'
})

export class SessionService {
  constructor(private http: HttpClient,
    private cookie: CookieService) { }
  
    public getSession(ID: SessionID) {
      return this.http.post('https://localhost:44309/api/Sessions/GetSession', ID, {responseType: 'json'});
    }
   
    getUser(ID:SessionID) {
      return this.http.post('https://localhost:44309/api/Sessions/GetUser', ID,{responseType:'json'});
    }
    
    destroySession(ID: SessionID) {
      this.cookie.delete('sessionID');
      return this.http.post('https://localhost:44309/api/Sessions/DeleteSession',ID);
    }
}
