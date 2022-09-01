import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Items ,myItems,myCart,Orders} from 'src/app/help';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.css']
})
export class ProductDescriptionComponent implements OnInit {
  items: Items[];
  items2: Items[];
  item: Items = new Items()
  myCart: myCart = new myCart()
  order: Orders = new Orders()
  
  dataa
  SearchText
  id
  brand
  color
  year
  buyerEmail
  constructor(private commonService:CommonService,private _Activatedroute:ActivatedRoute,
    private router:Router,) { }
  ngOnInit(): void {
    window.scrollTo(0,0);
    this.buyerEmail=localStorage.getItem("email");
    this.SearchText=this._Activatedroute.snapshot.paramMap.get("brand");

    this.commonService.getItems().subscribe((data: Items[]) => {
      // this.id = data['id']
      // this.year=data['year']
      // this.color=data['color']
      // this.brand=data['brand']
      let eData=data;
    
      this.item=eData.find(data=>data._id==this.SearchText)
      console.log("product deatils="+JSON.stringify(this.item))
    //  let cData = data;
     
      // this.items2=cData.filter(data => {
      //   return data.brand.toLowerCase().includes(this.SearchText.toLowerCase()) || data.color.toLowerCase().includes(this.SearchText.toLowerCase())|| data.vin.toLowerCase().includes(this.SearchText.toLowerCase());
      // })
    })
    
  }
  deleteProduct(data){
  // alert(data)
  if(confirm("you want to delete the item..?"))
  {
    console.log("delete is called...")
    this.commonService.deleteProductFromMyList(data);
    // this.commonService.deleteProductFromMyList(data);//this is working but i don't want to delete right now
    this.router.navigate(['/productlist']); 
  }
 
 
  }
}
