import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UserServiceService } from '../shared/user-service.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {
    UserId:"",
    Password:""
  };
  constructor(private service: UserServiceService,private router:Router,private cookie : CookieService) { }

  ngOnInit() { }

  submit(){
    console.log(this.user.UserId);
    this.service.validateUser(this.user)
    .subscribe( x => 
      {
        console.log("x is "+ x);
        if(x=="No")
        {
          window.alert("Invalid Username or password");
        this.router.navigate(['\login']);
        }
        else
        {
          this.cookie.set('sessionID', x);
          this.router.navigate(['']);
        }
      });
  }
}
