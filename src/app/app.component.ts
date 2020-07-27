import { Component } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {SessionService} from '../app/shared/session.service';
import {Router} from '@angular/router';
import { UserServiceService } from './shared/user-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angularfront';
  welcome = 'Account';
  login: Boolean = false;
  constructor(private  session: SessionService ,private router: Router,private cookie: CookieService){}
  public user:any;
  ngOnInit() {
    
    this.session.getSession({sessionID: this.cookie.get('sessionID')}).subscribe(data => {
      if (data['status']) {
        this.welcome = data['sess'].sessionID;
        this.login = true;
      } 
      else {
        console.log("fasfffw");
        this.welcome = 'Account';
        this.login = false;
        this.router.navigate(['/login']);
      }
    });

    this.session.getUser({sessionID: this.cookie.get('sessionID')}).subscribe(data => {
      this.user=data['user'][0];
      console.log("aaaaaa"+this.user.UserId);
    });
  }

  
}
