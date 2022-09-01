import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.css']
})
export class SellerProfileComponent implements OnInit {
  email
  searchText1
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.email=localStorage.getItem("email");
    if (localStorage.getItem("email")) {
      if (localStorage.getItem("userType") === "customer") {
        this.router.navigate(['home']);
      }
      if (localStorage.getItem("userType") === "seller") {
        this.router.navigate(['sellerProfile']);
      }

    }
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
