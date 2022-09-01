import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Items ,myItems,myCart,Orders,orderDetails} from 'src/app/help';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  userEmail
  SearchText
  items: Items[];
  items2: Items[];
  myCart:myCart[];
  myOrders:Orders[];
  // item: myItems = new myItems()
  item: Items = new Items()
  order: Orders = new Orders()
  orderDetailss:orderDetails[];
  orderDetails:orderDetails=new orderDetails();
  orderDetailsArr:any
  grandTotal:Number=0;
  pages
  constructor(private commonService:CommonService,private _Activatedroute:ActivatedRoute,
    private router:Router,) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.userEmail=localStorage.getItem("email");
    this.SearchText=this._Activatedroute.snapshot.paramMap.get("brand");

    this.commonService.getMyOrders().subscribe((data: Orders[]) => {
    let eData=data;
    this.myOrders=eData.filter(data=>data.buyerEmail==this.userEmail)
      console.log("product deatils="+JSON.stringify(this.myOrders))
      // this.items = this.items2.filter(o1 => this.myCart.some(o2 => o1.id === o2.productId));

      this.commonService.getItems().subscribe((data: Items[]) => {
        this.items2=data;
        console.log("All items="+JSON.stringify(this.items2))
      this.items = this.items2.filter(o1 => this.myOrders.some(o2 => o1._id === o2.productId));
 
       let myArr = [];
       this.myOrders.forEach(c => {
         this.orderDetails = new orderDetails();
        //  let rr = this.myOrders.find(e => e.buyerEmail == c.buyerEmail)
        if(c.productId){
console.log("Product id is available")
       
         let dd = this.items.find(k => k._id == c.productId)
         console.log("ddddddddd"+JSON.stringify(c))
         this.orderDetails.orderId=c._id;
         console.log(c._id)
         
        //  this.orderDetails.buyerEmail = c.email;
        //  this.orderDetails.mobile = rr.mobile;
        //  this.orderDetails.name = rr.name;
        //  this.orderDetails.address = rr.address;
        
          this.orderDetails.productName = dd.name;
        
         this.orderDetails.ram = dd.ram;
         this.orderDetails.rom = dd.rom;
         this.orderDetails.price = dd.price;
         this.orderDetails.quantity = c.quantity;
         this.orderDetails.brand = dd.brand;
         this.orderDetails.color=dd.color;
         this.orderDetails.sellerEmail = c.sellerEmail;
         this.orderDetails.productId = dd._id;
       this.orderDetails.orderStatus=c.orderStatus;
       this.orderDetails.images=dd.images;
       this.orderDetails.category=dd.category;
       if(dd.size){
        this.orderDetails.size=dd.size;
       }
       this.orderDetails.productOrderDate=c.productOrderDate;
       let ttlPrice=Number(c.quantity)*Number(dd.price);
       this.orderDetails.totalPrice=ttlPrice.toString();
      
         myArr.push(this.orderDetails);
        }
        else{
          console.log("Product id is not available")
        }
       })
       this.orderDetailsArr = myArr
       console.log("All orders = " + JSON.stringify(this.orderDetailsArr))
       this.orderDetailsArr.forEach(e=>{
        console.log(e.totalPrice)
        this.grandTotal=Number(e.totalPrice)+Number(this.grandTotal);
      })
        })
       

     })

     

    
  }

  placeOrder(item){
    if(localStorage.getItem("email")){
      this.order.buyerEmail=this.userEmail;
      this.order.sellerEmail=item.sellerEmail;
      this.order.productId=item._id;
     this.order.quantity=item.quantity
     console.log("orderplaced in ts ="+JSON.stringify(this.order))
      this.commonService.placeOrders(this.order);
      alert("Order placed successfully...")
    }
    else{
      
        alert("Login first")
        this.router.navigate(['/home']);
   
    }
   
  }
  removeItem(data){
    let dId=this.myCart.filter(e=>e.productId==data)
    console.log("deleted data"+JSON.stringify(dId))
    this.commonService.removeProduct(dId[0]._id);
    // this.commonService.removeProduct(data).subscribe((data: myCart[]) => {
    //   this.ngOnInit();
      
    //    })
  
  }
  cancelOrder(data){
    this.commonService.cancelOrder(data);
  }
}
