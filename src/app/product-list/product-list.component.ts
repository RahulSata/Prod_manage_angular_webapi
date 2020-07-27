import { Component, OnInit, ElementRef,ViewChild,Sanitizer  } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Productclass } from '../shared/productclass.model';
import { ProductService } from '../shared/product.service';
import { Subject } from 'rxjs';

import "datatables.net";


declare var $;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  dataTable:any;
  dtOptions:DataTables.Settings={};
  dtTrigger:Subject<any>=new Subject();
  product : Productclass;
  previewSignsrc:any;
  image_url: any;
  small_image :any;
  constructor(private sanitizer:DomSanitizer, private http:HttpClientModule,private route: ActivatedRoute,private service : ProductService) { }
  private products;
  ngOnInit() {
    
    this.dtOptions={
      scrollY: "200",
      orderCellsTop: true,
      //fixedHeader: true,
      pagingType: "full_numbers",
      columnDefs: [{
          orderable: false,
          targets: "no-sort"
      }],
      lengthMenu: [
          [5, 2, 10, 50, -1],
          [5, 2, 10, 50, "All"]
      ]
    };
    

    this.service.ProductList({userid:this.route.snapshot.params.userid}).subscribe(x=>
    {
      this.products=x;
      this.dtTrigger.next();
    });
  }


  getImage(_Id:string){
    console.log("in TS: "+ _Id);
    this.service.getImage({Id:_Id}).subscribe(image=>{
        let reader = new FileReader();
        reader.addEventListener("load", () => {
        this.image_url = reader.result;
        return this.image_url;
      }, false);
      if (image) {
        reader.readAsDataURL(image);
      }
    });
  }

  ngOnChanges():void{
    
  }
}
