import { Component, OnInit } from '@angular/core';
import { SessionService } from '../shared/session.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Userclass } from '../shared/userclass.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private  session: SessionService ,private router: Router,private cookie: CookieService){}
  welcome = 'Account';
  login: Boolean = false;
  public user:Userclass;
  ngOnInit() {
    this.session.getSession({sessionID: this.cookie.get('sessionID')}).subscribe(data => {
      if (data['status']) {
        this.welcome = data['sess'].sessionID;
        this.login = true;
      } 
      else {
        this.welcome = 'Account';
        this.login = false;
        this.router.navigate(['/login']);
      }
    });

    this.session.getUser({sessionID: this.cookie.get('sessionID')}).subscribe(data => {
      this.user=data['user'][0].UserId.replace(/\s/g, "");
      console.log("efwefwfwf"+this.user);
    });
   
  }
  logoff() {
    this.session.destroySession({sessionID: this.cookie.get('sessionID')}).subscribe(data => {
    });
    this.router.navigate(['/login']);
    this.ngOnInit();
  }

}
