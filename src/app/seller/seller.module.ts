import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';

import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AddItemsComponent } from './add-items/add-items.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { ProductListComponent } from './product-list/product-list.component';
import { BrowserModule } from '@angular/platform-browser';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule ,ReactiveFormsModule,FormControl} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { SellerAccountComponent } from './seller-account/seller-account.component';
import { OrderAcceptedComponent } from './order-accepted/order-accepted.component';
import {FileUploadModule} from "ng2-file-upload";   



@NgModule({
  declarations: [SellerHomeComponent, AddItemsComponent, AllOrdersComponent, ProductListComponent, ProductDescriptionComponent, SellerAccountComponent, OrderAcceptedComponent],
  imports: [
    CommonModule,
    SellerRoutingModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FileUploadModule
    
  ]
})
export class SellerModule { }
