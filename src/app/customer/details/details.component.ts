import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Items, myItems, myCart, Orders, Reviews, Help } from 'src/app/help';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  items: Items[];
  items2: Items[];
  item: Items = new Items()
  myCart: myCart = new myCart()
  order: Orders = new Orders()
  user: Help = new Help()
  user1: Help = new Help()
  reviews: Reviews[];
  review: Reviews = new Reviews()
  dataa
  SearchText
  id
  brand
  color
  year
  buyerEmail
  fiveStar: Number = 0
  fourStar: Number = 0
  threeStar: Number = 0
  twoStar: Number = 0
  oneStar: Number = 0
  fiveWidth: number = 0;
  fourWidth: number = 0;
  threeWidth: number = 0;
  twoWidth: number = 0;
  oneWidth: number = 0;
  totalreviews:Number=0;
  avgRating:Number=0;
  ratingClicked: number;
  itemIdRatingClicked: string;
  pincode:number=12456;
  rating
  inputName
  pages
  constructor(private commonService: CommonService, private _Activatedroute: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.buyerEmail = localStorage.getItem("email");
    this.SearchText = this._Activatedroute.snapshot.paramMap.get("brand");

    this.commonService.getItems().subscribe((data: Items[]) => {
      // this.id = data['id']
      // this.year=data['year']
      // this.color=data['color']
      // this.brand=data['brand']
      let eData = data;

      this.item = eData.find(data => data._id == this.SearchText)
      console.log("product deatils=" + JSON.stringify(this.item))
      this.commonService.getAll().subscribe((data: Help[]) => {
        this.user=data.find(e=>e.email==this.item.sellerEmail)
        this.user1=data.find(c=>c.email==this.buyerEmail)
      })
      this.commonService.getReviews().subscribe((data: Reviews[]) => {
        console.log("product reviews= "+JSON.stringify(data))
        this.reviews = data.filter(e => e.productId == this.item._id);
        console.log("All Reviews =" + JSON.stringify(this.reviews))
        this.totalreviews=this.reviews.length;
        console.log(this.reviews.length)
        let count5 = 0;
        let count4 = 0;
        let count3 = 0;
        let count2 = 0;
        let count1 = 0;
        for (let g of this.reviews) {
          console.log(g)

          if (g.ratings == 5) {
            count5++;
            console.log(count5)
            this.fiveStar = count5;
            this.fiveWidth = (count5 * 100) / this.reviews.length;
          }
          else if (g.ratings == 4) {
            count4++;
            console.log(count4)
            this.fourStar = count4;
            this.fourWidth = (count4 * 100) / this.reviews.length;
          }
          else if (g.ratings == 3) {
            count3++;
            console.log(count3)
            this.threeStar = count3;
            this.threeWidth = (count3 * 100) / this.reviews.length;
          }
          else if (g.ratings == 2) {
            count2++;
            console.log(count2)
            this.twoStar = count2;
            this.twoWidth = (count2 * 100) / this.reviews.length;
          }
          else if (g.ratings == 1) {
            count1++;
            this.oneStar = count1;
            console.log(count1)
            this.oneWidth = (count1 * 100) / this.reviews.length;
          }
          // this.proWidth=
          console.log("mera mulk = " + JSON.stringify(g.ratings))
        }
        let avgr=count5*5+count4*4+count3*3+count2*2+count1*1;
        this.avgRating=avgr/this.reviews.length;
        this.rating=this.avgRating.toFixed(2).toString();;
        this.avgRating=Number(this.avgRating.toFixed(0).toString());
        
      })
      //  let cData = data;

      // this.items2=cData.filter(data => {
      //   return data.brand.toLowerCase().includes(this.SearchText.toLowerCase()) || data.color.toLowerCase().includes(this.SearchText.toLowerCase())|| data.vin.toLowerCase().includes(this.SearchText.toLowerCase());
      // })
    })

  }
  addToCart(item) {
    if (localStorage.getItem("email")) {
      this.myCart.buyerEmail = this.buyerEmail;
      this.myCart.sellerEmail = item.sellerEmail;
      this.myCart.productId = item._id;
      // this.myCart.buyerEmail=this.buyerEmail;
      this.commonService.addToCart(this.myCart);
      alert("Item is added to your cart..")
    }
    else {
      // this.router.navigateByUrl('home', { skipLocationChange: true }).then(() => {
      alert("Login first")
      this.router.navigate(['/home']);
      // }); 
    }

  }

  placeOrder(item) {
    if (localStorage.getItem("email")) {
      this.order.buyerEmail = this.buyerEmail;
      this.order.sellerEmail = item.sellerEmail;
      this.order.productId = item.id;
      this.order.quantity = item.quantity
      console.log("orderplaced in ts =" + JSON.stringify(this.order))
      this.commonService.placeOrders(this.order);
    }
    else {

      alert("Login first")
      this.router.navigate(['/home']);

    }

  }
  ratingComponentClick(clickObj: any): void {
    this.avgRating=clickObj.rating;
    // this.rating=clickObj.rating;
    // this.review.ratings=clickObj.rating;
    // console.log(this.review.ratings);
    // console.log(clickObj);
    // const item = this.items333.find(((i: any) => i.id === clickObj.itemId));
    // if (!!item) {
    //   item.rating = clickObj.rating;
    //   this.ratingClicked = clickObj.rating;
    //   this.itemIdRatingClicked = item.company;
    // }

  }
  onClick(rating: number): void {
    this.rating = rating;

    // this.ratingClick.emit({
    //   itemId: this.itemId,
    //   rating: rating
    // });
  }
  updateUser(){
    
    // this.user.images=this.images.name;
    this.commonService.updateUsers(this.user1)
    // this.ngOnInit();
  }
}
