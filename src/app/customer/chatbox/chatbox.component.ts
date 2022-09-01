import { Component, OnInit ,AfterViewChecked,ViewChild,ElementRef} from '@angular/core';
import { Router } from '@angular/router';
// import { Chats  } from '../help';
import { from, of } from 'rxjs';
// import { CommonService  } from '../../common.service';
import { delay, map, mergeAll, mergeMap, switchAll, switchMap,retry } from 'rxjs/operators';

import * as io from 'socket.io-client';
import { interval, Subscription} from 'rxjs';
import { CommonService } from 'src/app/common.service';
const SOCKET_ENDPOINT = "localhost:4000";

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})


export class ChatboxComponent implements OnInit,AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  userName = '';
  message = '';
  activeUser="";
  messageList:any[]= [];
  userList: string[] = [];
  socket: any;
chatWith;
  constructor(private router:Router, private commonservice:CommonService) {
    // this.activeUser= localStorage.getItem("email");
    this.userName = this.activeUser;
    // this.activeUser= localStorage.getItem("sender_email");
   this.activeUser="rishuyadav"
    this.socket = io.io(`https://demo-rr.herokuapp.com/?userName=${this.activeUser}`);
    // this.socket = io.io(SOCKET_ENDPOINT+`/?userName=${this.activeUser}`);
    this.userName = this.activeUser;
  
    this.socket.emit('set-user-name', this.activeUser);
  
    this.socket.on('user-list', (userList: string[]) => {
      this.userList = userList;
      this.chatWith=this.userList.filter(res=>res!=this.activeUser)[0];
      // console.log("chat with ="+JSON.stringify(this.chatWith))
    });
    this.socket.on('output-message', (data) => {
      // this.chats = data;
      // console.log("from service"+ JSON.stringify(data))
    });
  
    this.socket.on('message-broadcast', (data) => {
    
      if (data) {
        // console.log("all data="+JSON.stringify(data))
        this.messageList=data;
      }
    });

    window.scrollTo(0, document.body.scrollHeight);

    // window.scrollTo(0, document.body.scrollHeight || document.getElementById('scroll').scrollHeight);
    // document.getElementById('scroll').scrollTop =  document.getElementById('scroll').scrollHeight
    // $(document).scrollTop($(document).height());
    // window.scrollTo(0,9999);
  }

ngOnInit(): void {
}
ngAfterViewChecked() {        
  this.scrollToBottom();        
} 

scrollToBottom(): void {
  try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  } catch(err) { }                 
}
sendMessage(): void {
  let currentTime=new Date();
  let trimTime=currentTime.toString().slice(4,21)
  console.log(trimTime)
  this.commonservice.sendMessage({message:this.message,sender_id:this.activeUser});
  this.socket.emit('message',{message:this.message,sender_id:this.activeUser} );
  // this.messageList.push({message: this.message, userName: this.userName, mine: true});
  this.message = '';
}
logout() {
  localStorage.removeItem("sender_email");


  this.router.navigate(['/home']);
 

}
clearChat(){
  // this.commonService.removeProduct(this.messageList);
  // window.location.reload();
}

}
