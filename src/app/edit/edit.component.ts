import { Component, OnInit } from '@angular/core';
import { Productclass } from '../shared/productclass.model';
import { ProductService } from '../shared/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  product={
    UserId:"",
    name:"",
    Category:"",
    Price:0,
    Quantity:0,
    Short_Description : "",
    Long_Description  :""
  };

  product1={
    UserId:"",
    name:"",
    Category:"",
    Price:0,
    Quantity:0,
    Short_description : "",
    Long_description  :""
  };
  constructor(private route: ActivatedRoute,private service:ProductService,private router:Router) { }
  imageurl:any;
  imagelargeurl:any;
  small_file_upload:File=null;
  large_file_upload:File=null;
  t:any;
  ngOnInit() {
    this.t=this.route.snapshot.params.userid;
    this.product.UserId=this.t;
    this.service.getProduct({Id:this.route.snapshot.params.id}).subscribe(x=>{
      this.product = x;
    });
    this.service.getImage({Id:this.route.snapshot.params.id}).subscribe(image=>{
      let reader = new FileReader();
      reader.addEventListener("load", () => {
      this.imageurl = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  });

  this.service.getlargeImage({Id:this.route.snapshot.params.id}).subscribe(image=>{
    let reader = new FileReader();
    reader.addEventListener("load", () => {
    this.imagelargeurl = reader.result;
  }, false);
  if (image) {
    reader.readAsDataURL(image);
  }
  });
  }

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
}
