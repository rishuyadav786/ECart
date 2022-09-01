import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Items ,Help,myItems,myCart,Orders} from 'src/app/help';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {
  userEmail
  SearchText
  items: Items[];
  users: Help[];
  items2: Items[];
  myCart:myCart[];
  grandTotal:Number=0;
  totalPrice:Number=0;
  // item: myItems = new myItems()
  item: Items = new Items()
  user: Help = new Help()
  order: Orders = new Orders()
  pages
  constructor(private commonService:CommonService,private _Activatedroute:ActivatedRoute,
    private router:Router,) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.userEmail=localStorage.getItem("email");
    this.SearchText=this._Activatedroute.snapshot.paramMap.get("brand");

    this.commonService.getAll().subscribe((data: Help[]) => {
      this.users = data;
      this.user = data.find(e => e.email == this.userEmail);
      this.commonService.myItems().subscribe((data: myCart[]) => {
        let eData=data;
        this.myCart=eData.filter(data=>data.buyerEmail==this.userEmail)
          console.log("my Cart="+JSON.stringify(this.myCart))
          // this.items = this.items2.filter(o1 => this.myCart.some(o2 => o1.id === o2.productId));


          this.commonService.getItems().subscribe((data: Items[]) => {
            this.items2=data;
           // let eData=data;
           // this.items=eData.filter(data=>data.buyerEmail==this.userEmail)
           //   console.log("product deatils="+JSON.stringify(this.item))
           this.items = this.items2.filter(o1 => this.myCart.some(o2 => o1._id === o2.productId));
           this.items.forEach(e=>{
             this.grandTotal=Number(e.price)+Number(this.grandTotal);
           })
           console.log("product deatils="+JSON.stringify(this.items))
            })
         })
    })
   


   
    
  }
placeOrder1(item){
   if(localStorage.getItem("email")){
      this.order.buyerEmail=this.userEmail;
      this.order.sellerEmail=item.sellerEmail;
      this.order.productId=item._id;
     this.order.quantity=item.quantity;
     let date: Date = new Date();  
     this.order.productOrderDate=date;
     this.order.orderStatus="Pending"
     console.log("orderplaced in ts ="+JSON.stringify(this.order))
    //   this.commonService.placeOrders(this.order);
    //   alert("Order placed successfully...")
    //   this.removeItem(item.id);
    //   this.ngOnInit();
    }
    else{
      
        alert("Login first")
        this.router.navigate(['/home']);
   
    }
}
  placeOrder(item){
    // console.log("order details="+JSON.stringify(item))

    if(localStorage.getItem("email")){
    //   this.order.buyerEmail=this.userEmail;
    //   this.order.sellerEmail=item.sellerEmail;
    //   this.order.productId=item.id;
    //  this.order.quantity=item.quantity;
    //  let date: Date = new Date();  
    //  this.order.productOrderDate=date;
    //  this.order.orderStatus="Pending"
    //  console.log("orderplaced in ts ="+JSON.stringify(this.order))
      this.commonService.placeOrders(this.order);
      alert("Order placed successfully...")
      // this.removeItem(item.id);
      this.ngOnInit();
      // this.router.navigate(['/myOrders']);
    }
    else{
      
        alert("Login first")
        this.router.navigate(['/home']);
   
    }
   
  }
  removeItem(data){
    console.log("id for delete"+JSON.stringify(data))
    let dId=this.myCart.filter(e=>e.productId==data)
    console.log("deleted data"+JSON.stringify(dId))
    console.log("id for delete 2"+JSON.stringify(dId[0]._id))
    let kkr=this.myCart.find(e=>e._id==dId[0]._id)
    this.commonService.removeProduct(kkr);
    // this.commonService.removeProduct(data).subscribe((data: myCart[]) => {
    //   this.ngOnInit();
      
    //    })
  
  }
  addPaymentType(data){

  }
}
