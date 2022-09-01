import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import{FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { DetailsComponent } from './details/details.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { OrdersComponent } from './orders/orders.component'
import { BrowserModule } from '@angular/platform-browser';

import {NgxPaginationModule} from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { RatingComponent } from './rating/rating.component';
import { ChatboxComponent } from './chatbox/chatbox.component';

// import { FilterPipe } from '../filter.pipe';
@NgModule({
  declarations: [HomeComponent, 
    LoginComponent, SearchComponent, DetailsComponent, MyCartComponent, OrdersComponent, MyOrdersComponent, OrderDetailsComponent, UserAccountComponent, RatingComponent, ChatboxComponent,
    //  FilterPipe
    ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule

  ],
  // exports:[FilterPipe]
})
export class CustomerModule { }
