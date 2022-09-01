import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Items } from '../help';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  items: Items[] = []
  searchText1
  email
  mySubscription: any;
  foods: any = [];
  electronics: any = [];
  fashion:any=[];
  homemade: any = [];
  userType
  userName
  userisSeller: boolean = false
  constructor(private commonService: CommonService, private router: Router,) {
    // window.location.reload();
    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // };
    // this.mySubscription = this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     // Trick the Router into believing it's last link wasn't previously loaded
    //     this.router.navigated = false;
    //   }
    // });
  }

  ngOnInit(): void {
    this.email = localStorage.getItem("email");
    this.userName = localStorage.getItem("userName");
    this.userType = localStorage.getItem("userType");
    if (this.userType = localStorage.getItem("userType") == "seller") {
      this.userisSeller = true;
    }
    this.commonService.getItems().subscribe((data: Items[]) => {
      this.items = data;

    })




    this.foods = [
      { label: 'Rice', value: 'rice' },
      { label: 'Wheate', value: 'wheate' },
      { label: 'Oil', value: 'oil' },
      { label: 'Surf', value: 'surf' },
      { label: 'Sugar', value: 'sugar' },
      { label: 'Salt', value: 'salt' },
      { label: 'Rice', value: 'rice' },
      { label: 'Wheate', value: 'wheate' },
      { label: 'Oil', value: 'oil' },
      { label: 'Surf', value: 'surf' },
      { label: 'Sugar', value: 'sugar' },
      { label: 'Salt', value: 'salt' },
      { label: 'Rice', value: 'rice' },
      { label: 'Wheate', value: 'wheate' },
      { label: 'Oil', value: 'oil' },
      { label: 'Surf', value: 'surf' },
      { label: 'Sugar', value: 'sugar' },
      { label: 'Salt', value: 'salt' }
    ]
    this.electronics = [
      { label: 'Mobile', value: 'mobile' },
      { label: 'Television', value: 'television' },
      { label: 'Camera', value: 'camera' },
      { label: 'Radio', value: 'radio' },
      { label: 'Speaker', value: 'speaker' },
      { label: 'AC', value: 'ac' },
      { label: 'Fridge', value: 'fridge' },
      { label: 'Fan', value: 'fan' },
      { label: 'Bulb', value: 'bulb' },
      { label: 'Ear Phone', value: 'earphone' },
      { label: 'Head Phone', value: 'headphone' },
      { label: 'Bluetooth', value: 'bluetooth' },
      { label: 'Computer', value: 'computer' },
      { label: 'Laptop', value: 'laptop' }
    
    ]
    this.fashion = [
      { label: 'Men Jeans', value: 'menjeans' },
      { label: 'Women Jeans', value: 'womenjeans' },
      { label: 'Saree', value: 'saree' },
      { label: 'Shirts', value: 'shirts' },
      { label: 'Pants', value: 'pants' },
      { label: 'Track Pants', value: 'trackpants' },
      { label: 'Jackets', value: 'jackets' },
      { label: 'Kurta', value: 'kurta' },
      { label: 'Shorts', value: 'shorts' },
      { label: 'Shooes', value: 'shooes' },
      { label: 'Gowns', value: 'gowns' },
      { label: 'Skirts', value: 'skirts' }
    ]
    this.homemade = [
      { label: 'Rice', value: 'rice' },
      { label: 'Wheate', value: 'wheate' },
      { label: 'Oil', value: 'oil' },
      { label: 'Surf', value: 'surf' },
      { label: 'Sugar', value: 'sugar' },
      { label: 'Salt', value: 'salt' },
      { label: 'Rice', value: 'rice' },
      { label: 'Wheate', value: 'wheate' },
      { label: 'Oil', value: 'oil' },
      { label: 'Surf', value: 'surf' },
      { label: 'Sugar', value: 'sugar' },
      { label: 'Salt', value: 'salt' }
    ]
  }
  logout() {
    localStorage.removeItem("email");
    localStorage.removeItem("userType");
    window.location.reload();
    this.router.navigate(['']);
    window.location.reload();

  }
  chat(){
    this.router.navigate(['/chatbox']);
  }
  myCart() {
    this.router.navigate(['/myCart']);
  }
  openMyOrders() {
    this.router.navigate(['/myOrders']);
  }
  filterMy(rk) {
    console.log("Search text = " + rk)
    //  this.commonService.filterData(rk,this.items)

    this.router.navigateByUrl('home', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/search', rk]);
    });
    // this.router.navigate(['SampleComponent', { skipLocationChange: true }]);
    // this.router.navigate(['/search',rk]);

    // let myData = this.items;
    // this.items2 = myData.filter(data => {
    //   return data.brand.toLowerCase().includes(rk.toLowerCase()) || data.color.toLowerCase().includes(rk.toLowerCase())|| data.vin.toLowerCase().includes(rk.toLowerCase());
    // })


  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
}
