import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './customer/home/home.component';
import { LoginComponent } from './customer/login/login.component';
import{ SellerHomeComponent} from './seller/seller-home/seller-home.component'
import { DetailsComponent } from './customer/details/details.component';
import { SearchComponent } from './customer/search/search.component';
import { MyCartComponent } from './customer/my-cart/my-cart.component';
import { AddItemsComponent } from './seller/add-items/add-items.component';
import { ProductListComponent } from './seller/product-list/product-list.component';
import { AllOrdersComponent } from './seller/all-orders/all-orders.component';
import { SellerProfileComponent } from './seller-profile/seller-profile.component';
import { MyOrdersComponent } from './customer/my-orders/my-orders.component';
import { ProductDescriptionComponent } from './seller/product-description/product-description.component';
import { OrderDetailsComponent } from './customer/order-details/order-details.component';
import { UserAccountComponent } from './customer/user-account/user-account.component';
import { SellerAccountComponent } from './seller/seller-account/seller-account.component';
import { OrderAcceptedComponent } from './seller/order-accepted/order-accepted.component';
import { ChatboxComponent } from './customer/chatbox/chatbox.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'sellerHome', component: SellerHomeComponent },
  { path: 'details/:brand', component: DetailsComponent },
  { path: 'OrderDetails/:brand', component: OrderDetailsComponent },
  { path: 'account', component: UserAccountComponent },
  { path: 'seller-account', component: SellerAccountComponent },
  { path: 'order-accepted', component: OrderAcceptedComponent },
  { path: 'chatbox', component: ChatboxComponent },
  { path: 'search/:brand', component: SearchComponent },
  { path: 'search', component: SearchComponent },
  { path: 'myCart', component: MyCartComponent },
  { path: 'additems', component: AddItemsComponent },
  { path: 'productlist', component: ProductListComponent },
  { path: 'allorders', component: AllOrdersComponent },
  { path: 'sellerProfile', component: SellerProfileComponent },
  { path: 'myOrders', component: MyOrdersComponent },
  { path: 'productDesc/:brand', component: ProductDescriptionComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    // CustomerRoutingModule
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
