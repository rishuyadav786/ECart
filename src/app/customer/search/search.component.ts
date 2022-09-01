import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Items,myCart } from 'src/app/help';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  items: Items[];
  items2: Items[];
  items3: Items[];
  fashionItems:Items[];
  electronicsItems:Items[];
  foodsItems:Items[];
  homemadeItems:Items[];
  myCart: myCart = new myCart()
  SearchText
  brandFilter
  ramFilter
  priceFilter
  categoryFilter
  myArr:any[]=[]
  buyerEmail
  pages
  myCheckbox
  // selectedCities: string[] = [];
  // selectedCategories: any[] = ['Technology', 'Sports'];
  // categories: any[] = [{name: 'Accounting', key: 'A'}, {name: 'Marketing', key: 'M'}, {name: 'Production', key: 'P'}, {name: 'Research', key: 'R'}];

   
  constructor(private commonService:CommonService,private _Activatedroute:ActivatedRoute,
    private router:Router,) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.buyerEmail=localStorage.getItem("email");
    this.SearchText=this._Activatedroute.snapshot.paramMap.get("brand");
    console.log("mera brand="+this.SearchText)
     // this.items2=this.commonService.getFilterData();
 this.commonService.getItems().subscribe((data: Items[]) => {
  this.items = data;
 let cData = data;
  // this.items2=cData.filter(data=>data.brand==this.brand)
  this.items2=cData.filter(data => {
    return data.brand.toLowerCase().includes(this.SearchText.toLowerCase()) || 
    // data.color.toLowerCase().includes(this.SearchText.toLowerCase())|| 
    data.name.toLowerCase().includes(this.SearchText.toLowerCase())  ||
    data.subCategory.toLowerCase().includes(this.SearchText.toLowerCase())|| 
    data.category.toLowerCase().includes(this.SearchText.toLowerCase())  ||
      data.sellerEmail==(this.SearchText);
  })
  this.items3=this.items2;
  this.electronicsItems=this.items3.filter(data=>data.category=="electronics");
  this.foodsItems=this.items3.filter(data=>data.category=="foods");
  this.fashionItems=this.items3.filter(data=>data.category=="fashion");
  this.homemadeItems=this.items3.filter(data=>data.category=="homemade");

  console.log("Search Items="+JSON.stringify(this.items3))
})

this.brandFilter=[{label:"Redmi",Value:"redmi"},
{label:"Samsung",Value:"samsung"},
{label:"Realme",Value:"realme"},
{label:"Honor",Value:"honor"},
{label:"Iphone",Value:"iphone"},
{label:"Oppo",Value:"oppo"},
{label:"Vivo",Value:"vivo"}]

this.ramFilter=[
{label:"1 gb",Value:"1"},
{label:"2 gb",Value:"2"},
{label:"3 gb",Value:"3"},
{label:"4 gb",Value:"4"},
{label:"6 gb",Value:"6"},
{label:"8 gb",Value:"8"},
{label:"10 gb",Value:"10"},
{label:"12 gb",Value:"12"},
{label:"512 mb",Value:"512"}
]
this.priceFilter=[
  {label:"1000 rs to 5000 rs" , lValue:"1000" , hValue:"5000"},
  {label:"5000 rs to 10000 rs" , lValue:"5000" , hValue:"10000"},
  {label:"10000 rs to 15000 rs" , lValue:"10000" , hValue:"15000"},
  {label:"15000 rs to 20000 rs" , lValue:"15000" , hValue:"20000"},
  {label:"20000 rs to 30000 rs" , lValue:"20000" , hValue:"30000"},
  {label:"30000 rs to 50000 rs" , lValue:"30000" , hValue:"50000"},
  {label:"50000 rs to 100000 rs" , lValue:"50000" , hValue:"100000"},
  {label:"100000 rs to 500000 rs" , lValue:"100000" , hValue:"500000"},
]
let merArr=[];
// console.log("all Data = "+JSON.stringify(this.items2))
// this.items.forEach(c => {
//   merArr.push(c.brand);
//   c.brand.filter((v, i, a) => a.indexOf(v) === i); 
// })


// this.items.forEach( (i) => merArr.push(i.brand) )
console.log("mera Arr = "+JSON.stringify(merArr))
  }
  // addToCart(){
    
  //   this.commonService.addToCart(this.myCart);
  // }
  
  sortBy(data){
    console.log("sort is clicked...")
if(data=="popularity"){
this.items3=this.items3.sort(function(a:any, b:any){return a.price.toString() - b.price.toString()});
}
else if(data=="relevance"){
  this.items3=this.items3.sort(function(a :any , b:any){return a.price.toString() - b.price.toString()});
}
else if(data=="priceLowToHigh"){
  this.items3=this.items3.sort(function(a, b){return Number(a.price) - Number(b.price)});
}
else if(data=="priceHighToLow"){
  this.items3=this.items3.sort(function(a, b){return Number(b.price) - Number(a.price)});
}
else{
  // this.items2=this.items2.sort(function(a, b){return Number(a._id) - Number(b._id)});
}
this.electronicsItems=this.items3.filter(data=>data.category=="electronics");
this.foodsItems=this.items3.filter(data=>data.category=="foods");
this.fashionItems=this.items3.filter(data=>data.category=="fashion");
this.homemadeItems=this.items3.filter(data=>data.category=="homemade");

  }

  myFun(data){
alert(data)
  }
  checkValue1(){

  }
  // filterByAll(type){
  //   let selectedCategory;
  //   selectedCategory=this.brandaFilter.concat(this.categoryFilter);
  //   let cars=this.items.filter(e=>{
  //     if(this.brandaFilter.length>=1 && this.categoryFilter.length>=1)
  //     {
  //       return (this.brandaFilter.indexOf(e.brand)!==-1) &&(this.categoryFilter.indexOf(e.category)!==-1)
  //     }
  //     else if(this.brandaFilter.length>=1 && this.categoryFilter.length<1)
  //     {
  //       return (this.categoryFilter.indexOf(e.category)!==-1)
  //     }
  //     else if(this.brandaFilter.length<1 && this.categoryFilter.length>=1)
  //     {
  //       return (this.brandaFilter.indexOf(e.brand)!==-1) 
  //     }
  //     else{
  //     return selectedCategory;
  //     }
  //   })
  // }
  filterMera(data,type){
    // this.categoryFilter=data
    console.log(data.target.value)
    console.log(data.target.checked)
    // this.myArr=[];
    // this.myArr.push(data.toLowerCase())
    this.myArr.push(data.target.value)
    let flagItem=this.items3
    // this.myArr.push(this.categoryFilter)
    console.log("brand 1 filter= "+JSON.stringify(data.target.value))
    console.log("brand  2filter= "+JSON.stringify(this.myArr))
    if(data.target.value.length>=1){
      if(type=="brand"){
        this.items2=flagItem.filter(e=>
          {
            console.log("e.brand = "+JSON.stringify(e.brand))
            console.log((this.myArr.indexOf(e.brand.toLowerCase())!==-1) )
            return (this.myArr.indexOf(e.brand.toLowerCase())!==-1) 
          })
      }
      else if(type=="cate"){
        this.items2=flagItem.filter(e=>
          {
            console.log("e.brand = "+JSON.stringify(e.category))
            return (data.indexOf(e.category)!==-1) 
          })
      }
      else if(type=="ram"){
        this.items2=flagItem.filter(e=>
          {
            console.log("e.brand = "+JSON.stringify(e.ram))
            return (this.myArr.indexOf(e.ram)!==-1) 
          })
      }
      else if(type=="price"){
        console.log("it is price......")
        if(data.target.checked){
          console.log("it is true......")
          this.items2=flagItem.filter(e=>Number(e.price)<=Number(data.target.value))
        }
        else{
          console.log("it is false......")
          this.items2=flagItem
        }
        // this.items2=flagItem.filter(e=>Number(e.price)<=Number(data))
          // {
          //   console.log(JSON.stringify(this.myArr.filter(ee=>Number(e.price)<=Number(ee))))
          //   return this.myArr.filter(ee=>Number(e.price)<=Number(ee))
          // }
          
       
         
          
      }
    }
 
    
    else{
      this.items2=flagItem;
    }
    this.electronicsItems=this.items2.filter(data=>data.category=="electronics");
    this.foodsItems=this.items2.filter(data=>data.category=="foods");
    this.fashionItems=this.items2.filter(data=>data.category=="fashion");
    this.homemadeItems=this.items2.filter(data=>data.category=="homemade");
    console.log("all filter data after check box ="+JSON.stringify(this.items2))
  }
  changed(e){
console.log(e)
  }
  checkValue(data){
    let myArr1
    myArr1.push(data)
    this.myArr=myArr1
    console.log("data changed=  "+data)
      }
  checkValue2(data){
    
    console.log("data changed=  "+data)
      }
      addToCart(item){
        if(localStorage.getItem("email")){
          this.myCart.buyerEmail=this.buyerEmail;
          this.myCart.sellerEmail=item.sellerEmail;
          this.myCart.productId=item.id;
          // this.myCart.buyerEmail=this.buyerEmail;
          this.commonService.addToCart(this.myCart);
          alert("Item is added to your cart..")
        }
        else{
          // this.router.navigateByUrl('home', { skipLocationChange: true }).then(() => {
            alert("Login first")
            this.router.navigate(['/home']);
        // }); 
        }
       
      }
      someFunction($scope){
        console.log("data coming too...."+JSON.stringify($scope.value))
      }
}
