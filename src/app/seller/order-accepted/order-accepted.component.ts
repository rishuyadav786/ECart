
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Items, Orders, Help, orderDetails } from 'src/app/help';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-order-accepted',
  templateUrl: './order-accepted.component.html',
  styleUrls: ['./order-accepted.component.css']
})
export class OrderAcceptedComponent implements OnInit {

  items: Items[];
  items2: Items[];
  orders: Orders[];
  users: Help[];
  users2: Help[];
  user: Help = new Help();
  order: Orders = new Orders();
  orderDetails: orderDetails = new orderDetails();
  orderDetailss: orderDetails;
  SearchText
  userEmail
  orderDetailsArr: any
  ekData
  pages
  constructor(private commonService: CommonService, private _Activatedroute: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.userEmail = localStorage.getItem("email")
    this.SearchText = this._Activatedroute.snapshot.paramMap.get("brand");
    this.commonService.getAllOrders().subscribe((data: Orders[]) => {
      // this.orders = data;
      let cData = data;
      this.orders = cData.filter(data => {
        return data.sellerEmail == this.userEmail && data.orderStatus=="Accepted"
      })
      this.commonService.getItems().subscribe((data1: Items[]) => {
        let cData = data1;
        this.items2 = cData.filter(data => data.sellerEmail == this.userEmail)
        this.items = this.items2.filter(o1 => this.orders.some(o2 => o1._id === o2.productId));
        this.commonService.getAll().subscribe((data2: Help[]) => {
          this.users2 = data2;
          this.users = this.users2.filter(o1 => this.orders.some(o2 => o1.email === o2.buyerEmail));
          let myArr = [];
          this.orders.forEach(c => {
            this.orderDetails = new orderDetails();
            let rr = this.users.find(e => e.email == c.buyerEmail)
            let dd = this.items.find(k => k._id == c.productId)
            this.orderDetails.orderId=c._id;
            this.orderDetails.buyerEmail = rr.email;
            this.orderDetails.mobile = rr.mobile;
            this.orderDetails.name = rr.name;
            this.orderDetails.address = rr.address;
            this.orderDetails.productName = dd.name;
            this.orderDetails.ram = dd.ram;
            this.orderDetails.rom = dd.rom;
            this.orderDetails.color=dd.color;
            this.orderDetails.images=dd.images;
            this.orderDetails.price = dd.price;
            this.orderDetails.quantity = c.quantity;
            this.orderDetails.brand = dd.brand;
            this.orderDetails.sellerEmail = c.sellerEmail;
            this.orderDetails.productId = dd._id;
            let ttlPrice=Number(c.quantity)*Number(dd.price);
            this.orderDetails.totalPrice=ttlPrice.toString();
          
            // this.orderDetailsArr= {...rr, ...dd}; 
            myArr.push(this.orderDetails);
          })
          this.orderDetailsArr = myArr
          console.log("All orders = " + JSON.stringify(this.orderDetailsArr))
        })
      })
    })

  }

  updateOrderStatus(data,value){
    this.order._id=data.orderId;
    this.order.sellerEmail=this.userEmail;
    this.order.buyerEmail=data.buyerEmail;
    this.order.quantity=data.quantity;
    this.order.productId=data.productId;
    this.order.orderStatus=value;
console.log(this.order)
    this.commonService.updateOrderStatus(this.order)
  }
}
