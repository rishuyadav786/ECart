import { Injectable } from '@angular/core';
import { Help,Items,myItems,orderDetails,Orders,myCart,Reviews} from '././help';
// import { Observable } from 'rxjs';
import { Observable, throwError } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import {httpClientModule,HttpClient} from '@angular/common/http';
import { map } from "rxjs/operators"
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  users: Help[] = [];
  user: Help = new Help()
  items: Items[] = [];
  items2: Items[] = [];
  item: Items = new Items()
  myCarts: myCart[] = [];
  myCart: myCart = new myCart()
  SERVER_URL: string = "https://file.io/";  
  apiUrl = 'http://localhost:4000/api/upload';
  webUrl1="http://localhost:4000/"
  webUrl="https://demo-rr.herokuapp.com/"
  webUrl2=" https://rishuyadav786.github.io/ECart/"

//   apiUrl='http://localhost/fdplaza/index.php'
  constructor(private http: HttpClient) { }
//   getAll(): Observable<Help[]> {
//     return <any>this.http.get("http://localhost:3000/users").pipe(map((Response: any) => Response));
// }
getAll(): Observable<Help[]> {
  return <any>this.http.get( `${this.webUrl}`+"api/getUser/").pipe(map((Response: any) => Response));
}

getById(id) {
    return <any>this.http.get("http://localhost:3000/users/" + id).pipe(map((Response: any) => Response));
}
// addUsers(users: any) {
//     this.http.post("http://localhost:3000/users", users).subscribe();
// }
addUsers(users: any) {
  this.http.post(`${this.webUrl}`+"api/SaveUser/", users).subscribe();
}


sendMessage(users){
  console.log("from service= "+JSON.stringify(users))
  this.http.post(`${this.webUrl}`+"api/sendMessage/", users).subscribe();
}

addItems(items: any) {
    console.log(items)
    // this.http.post("http://localhost:3000/myItems", items).subscribe();
    this.http.post(`${this.webUrl}`+"api/postData/", items).subscribe();
}
addOrders(order: any) {
    console.log(order)
    this.http.post("http://localhost:3000/myOrders", order).subscribe();
}

// getAllOrders() :Observable<Orders[]> {
//     return <any>this.http.get("http://localhost:3000/myOrders").pipe(map((Response: any) => Response));
   
// }
// removeUser(id1) {
//     console.log("from service")
//    this.http.delete("http://localhost:3000/users/" + id1).subscribe();
// }


updateUserData1(data:any) {
  console.log("service data to update="+JSON.stringify(data))
    this.http.put(("http://localhost:3000/users/" + data.id), data).subscribe();
}

updateUserData(data:any) {
  console.log("service data to update="+JSON.stringify(data))
  this.http.post(`${this.webUrl}`+"api/UpdateUserVerification", data).subscribe();
    // this.http.put(("/api/UpdateUserVerification" + data.id), data).subscribe();
}



updateUsers(data:any) {
  console.log("service data to update="+JSON.stringify(data))
    // this.http.put(("http://localhost:3000/users/" + data.id), data).subscribe();
    this.http.post(`${this.webUrl}`+"api/UpdateUserData", data).subscribe();
}

getItems() :Observable<Items[]> {
    // return <any>this.http.get("http://localhost:3000/myItems").pipe(map((Response: any) => Response));
    return <any>this.http.get(`${this.webUrl}`+"api/getItems/").pipe(map((Response: any) => Response));

   
}
getItemsr(data) :Observable<Items[]> {
  return <any>this.http.get("http://localhost:3000/myItems/ram/"+data).pipe(map((Response: any) => Response));
 
}

myItems() :Observable<myCart[]> {
    // return <any>this.http.get("http://localhost:3000/myCart").pipe(map((Response: any) => Response));
    return <any>this.http.get(`${this.webUrl}`+"api/getMyItems/").pipe(map((Response: any) => Response));

   
}
// getItems1(userEmail) :Observable<Items[]> {
//     return <any>this.http.get("http://localhost:3000/myItems/" + userEmail).pipe(map((Response: any) => Response));
  
// }

getFilterData(){
    // if(!this.items) return this.items2;
    console.log("filter called...")
    return this.items2;

}
filterData(rk,iData){
    // if (!this.items) return [];
    // if(!this.items) return this.items;
    //  let myData = this.items;
    console.log("i data ="+ JSON.stringify(iData))
     this.items2=iData.filter(data => {
      return data.brand.toLowerCase().includes(rk.toLowerCase()) || data.color.toLowerCase().includes(rk.toLowerCase())|| data.vin.toLowerCase().includes(rk.toLowerCase());
    })
    console.log("afetr filter data is ="+JSON.stringify(this.items2))
}
getItemsById(vin) {
    return <any>this.http.get("http://localhost:3000/myItems/" + vin).pipe(map((Response: any) => Response));
}

addToCart(items: myCart) {
    console.log(items)
    // this.http.post("http://localhost:3000/myCart", items).subscribe();
    this.http.post(`${this.webUrl}`+"api/addToCart/", items).subscribe();
}
placeOrders(items: Orders) {
    console.log("orderplaced in service ="+JSON.stringify(items))
    // this.http.post("http://localhost:3000/myOrders", items).subscribe();
    this.http.post(`${this.webUrl}`+"api/placeOrders/", items).subscribe();
}

addMyItems(items: Items){
    console.log(items)
    // this.http.post("http://localhost:3000/myItems", items).subscribe();
    this.http.post(`${this.webUrl}`+"api/postData/", items).subscribe();
}
getAllOrders() :Observable<Orders[]> {
    // return <any>this.http.get("http://localhost:3000/myOrders").pipe(map((Response: any) => Response));
    return <any>this.http.get(`${this.webUrl}`+"api/getAllOrders/").pipe(map((Response: any) => Response));

}
getReviews() :Observable<Reviews[]> {
  // return <any>this.http.get("http://localhost:3000/productReviews").pipe(map((Response: any) => Response));
  return <any>this.http.get(`${this.webUrl}`+"api/getAllReviews/").pipe(map((Response: any) => Response));

}

addReviews(items: Reviews) {
  console.log(items)
  // this.http.post("http://localhost:3000/productReviews", items).subscribe();
  this.http.post(`${this.webUrl}`+"api/addReviews/", items).subscribe();
}

updateReviews(items: Reviews) {
  console.log(items)

  // this.http.put(("http://localhost:3000/productReviews/" + items.id), items).subscribe();
  this.http.post(`${this.webUrl}`+"api/updateReviews/", items).subscribe();
}

removeProduct1(id){
    return <any>this.http.delete("http://localhost:3000/myCart",id).pipe(map((Response: any) => Response));
}

deleteProductFromMyList(items){
// this.http.delete("http://localhost:3000/myItems/"+id).subscribe();
this.http.post(`${this.webUrl}`+"api/deleteProductFromMyList/", items).subscribe();
}
removeProduct(_id) {
    console.log("from service"+JSON.stringify(_id))
  //  this.http.delete("http://localhost:3000/myCart/" + id1).subscribe();
  this.http.post(`${this.webUrl}`+"api/removeProductFromCart/", _id).subscribe();
}
cancelOrder(_id) {
  console.log("from service"+JSON.stringify(_id))
//  this.http.delete("http://localhost:3000/myOrders/" + id1).subscribe();
this.http.post(`${this.webUrl}`+"api/cancelOrder/", _id).subscribe();
}

updateOrderStatus(data:any) {
    // this.http.put(("http://localhost:3000/myOrders/" + data.id), data).subscribe();
    this.http.post(`${this.webUrl}`+"api/updateOrderStatus/", data).subscribe();
}
getMyOrders() :Observable<Orders[]> {
    // return <any>this.http.get("http://localhost:3000/myOrders").pipe(map((Response: any) => Response));
    return <any>this.http.get(`${this.webUrl}`+"api/getMyOrders/").pipe(map((Response: any) => Response));

}
// public upload(formData) {

// 	return this.http.post<any>("http://localhost:3000/myItems/", formData, {  
//       reportProgress: true,  
//       observe: 'events'  
//     });  
// }
uploadImage(componentId, image) {
    const formData: FormData = new FormData();
    formData.append('Image', image, image.name);
    formData.append('ComponentId', componentId);
    return this.http.post('/api/dashboard/UploadImage', formData);
}

upload(formData) {
    return this.http.post<any>(`${this.apiUrl}`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event => this.getEventMessage(event, formData)),
      catchError(this.handleError)
    );
  }

  private getEventMessage(event: HttpEvent<any>, formData) {

    switch (event.type) {
      case HttpEventType.UploadProgress:
        return this.fileUploadProgress(event);
		break;
      case HttpEventType.Response:
        return this.apiResponse(event);
		break;
      default:
        return `File "${formData.get('profile').name}" surprising upload event: ${event.type}.`;
    }
  }

  private fileUploadProgress(event) {
    const percentDone = Math.round(100 * event.loaded / event.total);
    return { status: 'progress', message: percentDone };
  }

  private apiResponse(event) {
    return event.body;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }


}
