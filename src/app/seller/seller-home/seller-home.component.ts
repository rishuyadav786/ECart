import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
email
searchText1
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.email=localStorage.getItem("email");
    // if (localStorage.getItem("email")) {
    //   if (localStorage.getItem("userType") === "customer") {
    //     this.router.navigate(['home']);
    //   }
    //   if (localStorage.getItem("userType") === "seller") {
    //     this.router.navigate(['sellerHome']);
    //   }

    // }
  }
  logout()
  {
    localStorage.removeItem("email");
    localStorage.removeItem("userType");
    this.router.navigate(['']);
  }
  filterMy(data){

  }
}
