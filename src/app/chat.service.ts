import { Injectable } from '@angular/core';
import * as io from "socket.io-client";
import { Observable } from "rxjs/observable";
@Injectable()
export class ChatService {

  socket : any;

  constructor() {
    this.socket = io('http://localhost:8080/');
    this.socket.on("connect", isConnected => {
      console.log("connect");
    });
  }

  login(userName : string) : Observable<boolean>{
    let observable = new Observable(observer => {
      this.socket.emit("adduser", userName.toLowerCase(), successful => {
        console.log("Replay recevied");
        return observer.next(successful);
      });
    });
    return observable;
  }
  getRoomList() : Observable<string[]>{
    let obs = new Observable( observer => {
      this.socket.emit("rooms");
      this.socket.on("roomlist", (lst) => {
        let strArr : string[] = [];
        for (var x in lst){
          strArr.push(x);
        }
        observer.next(strArr);
      });
    });
    return obs;
  }
}
