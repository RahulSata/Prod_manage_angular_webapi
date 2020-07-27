import { Component, OnInit } from '@angular/core';
import { Productclass } from '../shared/productclass.model';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../shared/product.service';
import { SessionService } from '../shared/session.service';
import { Userclass } from '../shared/userclass.model';
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  product={
    UserId:"",
    name:"",
    Category:"",
    Price:0,
    Quantity:0,
    Short_description : "",
    Long_description  :""
  };
 
  public user:Userclass;

  constructor(private service: ProductService,private route: ActivatedRoute ,private router:Router,private cookie:CookieService,private session:SessionService) { }
  t:string;
  ngOnInit() {
    this.t=this.route.snapshot.params.userid;
    this.product.UserId=this.t;
  }
  imageurl:string="/assets/Images/pro_manage1.jpg";
  imagelargeurl:string="/assets/Images/pro_manage1.jpg";
  small_file_upload:File=null;
  large_file_upload:File=null;
  filesmallChange(file : FileList){
    this.small_file_upload=file.item(0);
    var render = new FileReader();

    render.onload=(event:any)=>{
      this.imageurl=event.target.result;
    }
    render.readAsDataURL(this.small_file_upload);
  }

  filelargeChange(file : FileList){
    this.large_file_upload=file.item(0);
    var render = new FileReader();

    render.onload=(event:any)=>{
      this.imagelargeurl=event.target.result;
    }
    render.readAsDataURL(this.large_file_upload);
  }

  
  submit(){
    console.log("Submit done");
    console.log("qwdq"+this.product.UserId);
    this.service.AddProduct(this.product,this.small_file_upload,this.large_file_upload)
    .subscribe( x => 
      {
        console.log("ADD: "+x);
        this.router.navigate(['product-list',this.t]);
      })
  };
}
