import { Component, OnInit } from '@angular/core';
import { Items,myItems} from 'src/app/help';
import { CommonService } from 'src/app/common.service';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import {  ViewChild, ElementRef  } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';  
import { catchError, map } from 'rxjs/operators';  
import { FormBuilder, FormGroup } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CompileShallowModuleMetadata } from '@angular/compiler';
// import { FileUploader } from 'ng2-file-upload/file-upload/file-uploader.class';
// import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';

const uploadAPI = 'http://localhost:4000/api/upload'; // better use a service class

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css']
})
export class AddItemsComponent implements OnInit {
  // @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = [];  
  item: Items = new Items()
  items: Items[];
  userEmail
  imageUrl
  title = 'ng8fileuploadexample';
  fashion:any=[];
  foods:any=[];
  electronics:any=[];
  homemade:any=[];
  profileForm: FormGroup;
  error: string;
  // Uploader
selectedFile:File=null
images;
multipleImages = [];
  fileUpload = {status: '', message: '', filePath: ''};
  // files
  // public uploader: FileUploader = new FileUploader({ url:  uploadAPI, itemAlias: 'file' });
  public uploader: FileUploader = new FileUploader({ url:uploadAPI, itemAlias: 'file' ,removeAfterUpload: false, autoUpload: true });
  constructor(private http:HttpClient,private commonService: CommonService, private router: Router,private fb: FormBuilder) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.userEmail=localStorage.getItem("email");
    

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
    this.profileForm = this.fb.group({
      name: [''],
      profile: ['']
    });
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('FileUpload:uploaded successfully:', item, status, response);
         alert('Your file has been uploaded successfully');
    };
 }
  
  addItems(cData){
    this.item.sellerEmail=this.userEmail;
    this.item.images=this.images.name;
    console.log("items data to add = " + JSON.stringify(this.item))
    console.log(this.multipleImages)
    alert("You want to add this item ....?")
    this.commonService.addMyItems(this.item);
  }
//   uploadFile(file) {  
//     const formData = new FormData();  
//     formData.append('file', file.data);  
//     file.inProgress = true;  
//     this.commonService.upload(formData).pipe(  
//       map(event => {  
//         switch (event.type) {  
//           case HttpEventType.UploadProgress:  
//             file.progress = Math.round(event.loaded * 100 / event.total);  
//             break;  
//           case HttpEventType.Response:  
//             return event;  
//         }  
//       }),  
//       catchError((error: HttpErrorResponse) => {  
//         file.inProgress = false;  
//         return of(`${file.data.name} upload failed.`);  
//       })).subscribe((event: any) => {  
//         if (typeof (event) === 'object') {  
//           console.log( "rishu image upload = "+JSON.stringify(event.body));  
//         }  
//       });  
//   }
//   private uploadFiles() {  
//     this.fileUpload.nativeElement.value = '';  
//     this.files.forEach(file => {  
//       this.uploadFile(file);  
//     });  
// }

// onClick() {  
//   const fileUpload = this.fileUpload.nativeElement;
//   fileUpload.onchange = () => {  
//     console.log("punam image ="+JSON.stringify(fileUpload.files))
//   for (let index = 0; index < fileUpload.files.length; index++)  
//   {  
//    const file = fileUpload.files[index];  
//    this.files.push({ data: file, inProgress: false, progress: 0});  
//   }  
//   console.log("vishal image ="+JSON.stringify(this.files))
//     this.uploadFiles();  
//   };  
//   fileUpload.click();  
// }

onSelectedFile(event) {
  console.log(event.target.files)
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    console.log(file)
    this.profileForm.get('profile').setValue(file);
  }
}
onSelectedFile1(event){
  this.selectedFile=<File>event.target.files[0];
  console.log(event)
}
onSubmit1() {
  const formData = new FormData();
  formData.append('name', this.selectedFile,this.selectedFile.name);
  // formData.append('name', this.profileForm.get('name').value);
  // formData.append('profile', this.profileForm.get('profile').value);
// 
  this.commonService.upload(formData).subscribe(
    res => this.fileUpload = res,
    err => this.error = err
  );
}

selectImage(event) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.images = file;
  }
  console.log(this.images)
}

selectMultipleImage(event){
  if (event.target.files.length > 0) {
    this.multipleImages = event.target.files;
  }
  console.log(this.multipleImages)
}

onSubmit(){
  const formData = new FormData();
  formData.append('file', this.images);

  this.http.post<any>('http://localhost:4000/file', formData).subscribe(
    (res) => console.log(res),
    (err) => console.log(err)
  );
}

onMultipleSubmit(){
  const formData = new FormData();
  for(let img of this.multipleImages){
    formData.append('files', img);
  }

  this.http.post<any>('http://localhost:4000/multipleFiles', formData).subscribe(
    (res) => console.log(res),
    (err) => console.log(err)
  );
}

sendMail(data){
  console.log(data);
  let users=[
    {
      "id": "1",
      "name": "Rishu",
      "email": "rk@gmail.com",
      "password": "123456",
      "userType": "customer",
      "mobile": "9804050418",
      "address": "4 no Railway Gate, Belgharia Kolkata-700056"
    },
    {
      "id": "2",
      "name": "Vishal",
      "email": "vk@gmail.com",
      "password": "123456",
      "userType": "customer",
      "mobile": "7890993832",
      "address": "4 no Railway Gate, Agarpara Kolkata-700056"
    }];

  this.http.post<any>('http://localhost:4000/sendmail', users).subscribe(
    (res) => console.log(res),
    (err) => console.log(err)
  );
}
}
