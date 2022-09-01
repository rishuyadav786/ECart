import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerModule } from './customer/customer.module';
// import{FormsModule, ReactiveFormsModule} from '@angular/forms'
import { CommonService } from './common.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FilterPipe } from './filter.pipe';
import { ProfileComponent } from './profile/profile.component';
import { FooterComponent } from './footer/footer.component';
import { SellerModule } from './seller/seller.module';
import { SellerProfileComponent } from './seller-profile/seller-profile.component';
import { FileUploadModule } from 'ng2-file-upload';
import {NgxPaginationModule} from 'ngx-pagination';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import {StarRatingModule} from 'angular-star-rating';
import { RatingModule } from 'ng-starrating';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    ProfileComponent,
    FooterComponent,
    SellerProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SellerModule,
    NgxPaginationModule,
    FileUploadModule,
    RatingModule,
    StarRatingModule.forRoot()
    // FormControl
  ],
  providers: [CommonService],
  bootstrap: [AppComponent],
  // exports:[FilterPipe]
})
export class AppModule { }
