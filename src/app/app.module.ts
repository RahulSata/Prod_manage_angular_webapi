import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { Productclass } from './shared/productclass.model';
import { LoginComponent } from './login/login.component';
import {Routes,RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { UserServiceService } from './shared/user-service.service';
import { SessionService } from './shared/session.service';
import {CookieService} from 'ngx-cookie-service';
import { HeaderComponent } from './header/header.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductService } from './shared/product.service';
import { CreateProductComponent } from './create-product/create-product.component';
import { DataTablesModule } from 'angular-datatables';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';


const routes : Routes = [ 
  { path: '', component: HomeComponent},
  { path:'login', component:LoginComponent},
  { path:'signup', component:SignupComponent},
  { path:'product-list/:userid', component:ProductListComponent},
  { path:'product-create/:userid', component:CreateProductComponent},
  { path:'edit/:id', component:EditComponent},
  { path:'delete/:id', component:DeleteComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    HeaderComponent,
    ProductListComponent,
    CreateProductComponent,
    EditComponent,
    DeleteComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    DataTablesModule
     ],
  providers: [Productclass,
    UserServiceService,
    SessionService,
    CookieService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
