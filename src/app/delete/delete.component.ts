import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../shared/session.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(private cookie: CookieService,private service:ProductService,private session:SessionService, private route:ActivatedRoute,private router:Router) { }
  user:any;
  ngOnInit() {
    this.session.getUser({sessionID: this.cookie.get('sessionID')}).subscribe(data => {
      this.user=data['user'][0].UserId.replace(/\s/g, "");
      console.log("efwefwfwf"+this.user);
    });

    this.service.delete({Id:this.route.snapshot.params.id}).subscribe(data=>{
       this.router.navigate(['product-list',this.user]);
    });
  }

}
