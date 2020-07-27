import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UserServiceService } from '../shared/user-service.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user = {
    UserId:"",
    Password:""
  };
  constructor(private service: UserServiceService,private router:Router,private cookie:CookieService) { }

  ngOnInit() {
  }
  submit(){
    this.service.AddUser(this.user)
    .subscribe( x => 
      {
        if(x['status']=='Member'){
            window.alert("You are already a member...Please login");
            this.router.navigate(['login']);
        }
        else{
        this.cookie.set('sessionID', x['t1']);
        this.router.navigate(['']);
        }
      });
  }
}
