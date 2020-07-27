import { Injectable } from '@angular/core';
import {Productclass} from './productclass.model';
import { HttpClient } from '@angular/common/http';

interface Prod{
  Id: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  formdata : Productclass ;
  constructor(private http:HttpClient) { }
  
  public ProductList(formdata){
    return this.http.post<Productclass[]>('https://localhost:44309/api/Products/GetProducts',formdata);
  }
  public AddProduct(product:Productclass,fileToupload:File,fileToupload1:File){
    console.log(product);
    const form:FormData = new FormData();
    form.append('UserId',product.UserId);
    form.append('Price',product.Price.toString());
    form.append('name',product.name);
    form.append('Category',product.Category);
    form.append('Quantity',product.Quantity.toString());
    form.append('Short_description',product.Short_description);
    form.append('Long_description',product.Long_description);
    form.append('Small_Img',fileToupload,fileToupload.name);
    form.append('Large_Img',fileToupload1,fileToupload1.name);
    return this.http.post<string>('https://localhost:44309/api/Products/CreateProduct',form);
  }

  getImage(ID:Prod){
    console.log("Your id is "+ID.Id);
    return this.http.post<Blob>('https://localhost:44309/api/Products/getimage',ID,{responseType: 'blob' as 'json'});
  }
  getlargeImage(ID:Prod){
    console.log("Your id is "+ID.Id);
    return this.http.post<Blob>('https://localhost:44309/api/Products/getlargeimage',ID,{responseType: 'blob' as 'json'});
  }
  getProduct(ID:Prod){
    return this.http.post<any>('https://localhost:44309/api/Products/GetProduct',ID);
  }

  public editProduct(product:Productclass,fileToupload:File,fileToupload1:File){
    console.log(product);
    const form:FormData = new FormData();
    form.append('UserId',product.UserId);
    form.append('Price',product.Price.toString());
    form.append('name',product.name);
    form.append('Category',product.Category);
    form.append('Quantity',product.Quantity.toString());
    form.append('Short_description',product.Short_description);
    form.append('Long_description',product.Long_description);
    form.append('Small_Img',fileToupload,fileToupload.name);
    form.append('Large_Img',fileToupload1,fileToupload1.name);
    return this.http.post<string>('https://localhost:44309/api/Products/CreateProduct',form);
  }

  public delete(ID:Prod){
    return this.http.post<string>('https://localhost:44309/api/Products/DeleteProduct',ID);
  }
}
