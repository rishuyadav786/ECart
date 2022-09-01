import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Help, Items } from '../../help'
import { CommonService } from '../../common.service'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// import {FilterPipe} from '../../filter.pipe'
import { Observable, throwError } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'FoodPlaza';
  user: Help = new Help()
  fpuser: Help = new Help()
  user1: Help = new Help()
  item: Items = new Items()
  items1: Items = new Items()
  users: Help[];
  sellers: Help[];
  items: Items[];
  items2: Items[];
  display: boolean = true;
  logedin: boolean = false;
  searchText1
  randomNumber: Number
  veryfyAcoountform: boolean = false
  submitButton: boolean = false
  forgotpassword:boolean=false
  confirmPassword:boolean=false
  pages
  rkk
  @Output() closeModalEvent = new EventEmitter<boolean>();
  @ViewChild('exampleModal') exampleModal: ElementRef;
  @ViewChild('closebutton') closebutton;
  constructor(private commonService: CommonService, private router: Router, private http: HttpClient) { }
  // time = new Observable(observer =>
  //   setInterval(() => observer.next(new Date().toString()), 2000)
  // );
  ngOnInit() {
    window.scrollTo(0,300);
    if (localStorage.getItem("email")) {
      if (localStorage.getItem("userType") === "customer") {
        this.router.navigate(['home']);
      }
      if (localStorage.getItem("userType") === "seller") {
        this.router.navigate(['sellerProfile']);
      }

    }
    this.commonService.getAll().subscribe((data: Help[]) => {
      this.users = data;
      console.log("all users= "+JSON.stringify(this.users))
      this.sellers = data.filter(e => e.userType == 'seller');

    })
    this.commonService.getItems().subscribe((data: Items[]) => {
      this.items = data;
      this.items2 = data;
      console.log("all Items= "+JSON.stringify(this.items2))
    })
    // this.items2=this.commonService.filterData(); 


    // this.userTypes=[
    //   {label: 'Customer', value: 'customer'},
    //         {label: 'Seller', value: 'seller'},

    // ];
    // this.items = [];
    // this.items.push({label: 'Customer ' , value: 'customer '});
    //     this.items.push({label: 'Seller ' , value: 'seller '});



  };
  filterMy(rk) {
    console.log("Search text = " + rk)
    let myData = this.items;
    this.items2 = myData.filter(data => {
      return data.brand.toLowerCase().includes(rk.toLowerCase()) || data.color.toLowerCase().includes(rk.toLowerCase()) || data._id.toLowerCase().includes(rk.toLowerCase());
    })

  }
  showDialog() {
    this.display = true;
  }
  openDisc(product) {
    this.router.navigate(['/search', product.brand]);
    // "['search',product.productID]"
  }
  openSellerProduct(user) {
    this.router.navigate(['/search', user.email]);
  }
  openProductDetails(item){
    this.router.navigate(['/details', item._id]);
  }
  logout() {
    localStorage.removeItem("email");
    localStorage.removeItem("userType");
    window.location.reload();
    window.location.reload();
    this.router.navigate(['']);
   

  }
  changeLoginOption() {
    this.display = !this.display;
    this.forgotpassword=false
    this.veryfyAcoountform=false
  }
  login(data) {
    let email1: any = this.users.find(res => res.email === this.user.email)

    console.log("users details 1 =" + JSON.stringify(this.users))
    console.log("users details 2 =" + JSON.stringify(email1))
    if (!email1) {
      alert("User not found..")
      console.log("User not found ")
    }
    else {
      if (email1.password === this.user.password) {
        if (email1.isUserVerified) {
          
         
          if (email1.userType === "customer") {
            localStorage.setItem("email", email1.email);
            localStorage.setItem("userType", email1.userType);
            localStorage.setItem("userName", email1.name);
            window.location.reload();
            //  this.router.navigate(['']);
            this.router.navigate(['home']);
            this.logedin = true;
            
          }
          if (email1.userType === "seller") {
            localStorage.setItem("email", email1.email);
            localStorage.setItem("userType", email1.userType);
            localStorage.setItem("userName", email1.name);
            window.location.reload(); 
            // this.router.navigate(['']);
            this.router.navigate(['sellerProfile']);
            this.logedin = true;
          }

        }
        else {
          
          // this.closeModalEvent.emit(false); 
          // (this.exampleModal.nativeElement).modal('hide');
          alert("please veryfy your account..")
          this.user=new Help();
          this.user=email1
          this.veryfyAcoountform=true

        }
     
      }
      else {
        // this.closeModalEvent.emit(false); 
        // (this.exampleModal.nativeElement).modal('hide');
       
        console.log("password does not match")
      }
    }
    this.closebutton.nativeElement.click();
    // this.closeModalEvent.emit(false); 
            // this.exampleModal.nativeElement.modal('hide');
    console.log("users =" + JSON.stringify(data))
  }
  addUser(data) {
    // this.user.isUserVerified=false;
    // this.user.randomNumber= Math.floor(Math.random() * (999999 - 100000)) + 100000;
    // this.randomNumber=this.user.randomNumber
    this.user.isUserVerified=false;
    console.log("user sata to add = " + JSON.stringify(this.user))
    this.commonService.addUsers(this.user);
    this.veryfyAcoountform = true;
    this.sendMail();
  }

  sendMail() {
    this.user.isUserVerified = false;
    this.user.randomNumber = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    this.randomNumber = this.user.randomNumber
    console.log("users to be verified = " + JSON.stringify(this.user))
    this.http.post<any>('https://fdplaza.herokuapp.com/sendmail', this.user).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );

  }
  sendMaill() {
    this.commonService.getAll().subscribe((data: Help[]) => {
      this.users = data;
      let email1: any = this.users.find(res => res.email === this.fpuser.email)
      if(email1){
        this.fpuser._id=email1._id;
        // this.user.isUserVerified = false;
        this.fpuser.randomNumber = Math.floor(Math.random() * (999999 - 100000)) + 100000;
        this.randomNumber = this.fpuser.randomNumber
        // console.log("users to be verified = " + JSON.stringify(this.user))
        this.http.post<any>('https://fdplaza.herokuapp.com/sendmail', this.fpuser).subscribe(
          (res) => console.log(res),
          (err) => console.log(err)
        );

      }

    })


  }
  saveNewPassword(){
    this.user=new Help();
    if(this.fpuser.password){
      this.commonService.getAll().subscribe((data: Help[]) => {
        // this.users = data;
       let kk= data.find(e => e.email ==this.fpuser.email);
      
       this.user._id=kk._id;
    this.user=kk;
    this.user.password=this.fpuser.password;
       this.user.isUserVerified = true;
      console.log("data for update =" + JSON.stringify(this.user))
      this.commonService.updateUserData(this.user);
      alert("password updated succesfully");
      // this.submitButton = true
      // this.veryfyAcoountform=false
      this.router.navigate(['home']);
      })
      
    }
  }
  verifyOtp(){
    console.log("verify otp clickedd....")
    if(this.fpuser.otp){
      console.log("come to if condition")
    if(this.fpuser.otp==this.randomNumber){
    alert("otp matched....");
    this.forgotpassword=false;
    this.confirmPassword=true;


  }
}

  }
  otpVerify() { 
    if(this.user.otp){
      if (this.user.otp == this.randomNumber) {
        this.commonService.getAll().subscribe((data: Help[]) => {
          // this.users = data;
         let kk= data.find(e => e.email ==this.user.email);
         console.log("my users ="+JSON.stringify(kk))
         this.user._id=kk._id;
         this.user.isUserVerified = true;
        console.log("data for update =" + JSON.stringify(this.user))
        this.commonService.updateUserData(this.user);
        alert("otp matched..");
        this.submitButton = true
        this.veryfyAcoountform=false
        this.router.navigate(['home']);
        })
        
      }
      else{
        alert("otp does not matched...")
      }
    }
    
  }
  forgotPwd(){
    this.forgotpassword=true;
    this.display=false;
  }
}
