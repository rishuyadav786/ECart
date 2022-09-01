import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Help, Items, myItems, myCart, Orders, Reviews,orderDetails } from 'src/app/help';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StarRatingComponent } from 'ng-starrating';
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  user: Help = new Help()
  fpuser: Help = new Help()
  user1: Help = new Help()
  item: Items = new Items()
  items1: Items = new Items()
  item2: Items = new Items()
  order1: Orders = new Orders()
  review: Reviews = new Reviews()
  
  users: Help[];
  sellers: Help[];
  items: Items[];
  items2: Items[];
  reviews:Reviews[];
  userEmail
  SearchText;
  proWidth: number = 1;
  ratingClicked: number;
  itemIdRatingClicked: string;
  alreadyRated:boolean=false;
  totalP:Number=0
  items333: any[] = [
    { 'id': 0, 'rating': 3, 'contact': 'Dennis Phillips', 'company': 'PROFLEX' },
    { 'id': 1, 'rating': 1, 'contact': 'Morgan Mccarthy', 'company': 'CENTREXIN' },
    { 'id': 2, 'rating': 2, 'contact': 'Brady Craft', 'company': 'JIMBIES' },
    { 'id': 3, 'rating': 5, 'contact': 'Alvarado Roman', 'company': 'TERRAGO' },
    { 'id': 4, 'rating': 4, 'contact': 'Clark Daugherty', 'company': 'ISOTRONIC' }
  ];
  constructor(private commonService: CommonService, private _Activatedroute: ActivatedRoute, private router: Router, private http: HttpClient) { }
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.userEmail = localStorage.getItem("email")
    this.SearchText = this._Activatedroute.snapshot.paramMap.get("brand");
    // if (localStorage.getItem("email")) {
    //   if (localStorage.getItem("userType") === "customer") {
    //     this.router.navigate(['home']);
    //   }
    //   if (localStorage.getItem("userType") === "seller") {
    //     this.router.navigate(['sellerProfile']);
    //   }

    // }


 
    this.commonService.getMyOrders().subscribe((data: Orders[]) => {
      let eData = data;
      this.order1 = eData.find(e => e._id == this.SearchText);
      console.log("mera order hai =" + JSON.stringify(this.order1))
      if (this.order1.orderStatus == "Pending") {
        this.proWidth = 1;
      }
      else if (this.order1.orderStatus == "Accepted") {
        this.proWidth = 100;
      }
      else if (this.order1.orderStatus == "Packed") {
        this.proWidth = 34;
      }
      else if (this.order1.orderStatus == "Shiped") {
        this.proWidth = 67;
      }
      this.commonService.getAll().subscribe((data: Help[]) => {
        this.users = data;
        this.user = data.find(e => e.email == this.order1.buyerEmail);
        console.log("user details=" + JSON.stringify(this.user))
        this.commonService.getItems().subscribe((data: Items[]) => {
          this.items = data;
          this.items2 = data;
          console.log(this.items)
          this.item2 = this.items.find(data => data._id == this.order1.productId)
          this.totalP=Number(this.item2.price)*Number(this.order1.quantity);
          this.commonService.getReviews().subscribe((data: Reviews[]) => {
            this.reviews= data;
            let cRev=this.reviews.find(dk=>{
              
             return  dk.productId==this.order1.productId && dk.buyerEmail==this.userEmail
            })
            if(cRev){
              this.review=cRev
              this.review._id=this.review._id;
              console.log("My Review"+JSON.stringify(this.review))
            }
          
            if(this.review.ratings){
              // alert("rating "+this.review.ratings)
              this.alreadyRated=true;
            }
          })

        })

      })
    })


  }
  addReviews(){
this.review.buyerEmail=this.order1.buyerEmail;
this.review.sellerEmail=this.order1.sellerEmail;
this.review.productId=this.order1.productId;
this.review.name=this.user.name;
this.review.buyerEmail=this.order1.buyerEmail;
this.review.images=this.user.images;
if(this.alreadyRated){
  this.commonService.updateReviews(this.review);
}
else{
  this.commonService.addReviews(this.review);
}
   
  }
  
  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    alert(`Old Value:${$event.oldValue}, 
      New Value: ${$event.newValue}, 
      Checked Color: ${$event.starRating.checkedcolor}, 
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }


  ratingComponentClick(clickObj: any): void {
    this.review.ratings=clickObj.rating;
    // this.review.ratings=4;
    this.addReviews();
    console.log(this.review.ratings);
    console.log(clickObj);
    const item = this.items333.find(((i: any) => i.id === clickObj.itemId));
    if (!!item) {
      item.rating = clickObj.rating;
      this.ratingClicked = clickObj.rating;
      this.itemIdRatingClicked = item.company;
    }

  }
  cancelOrder(data){
    this.commonService.cancelOrder(data);
  }
}
