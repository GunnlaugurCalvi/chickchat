import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class ChatService {

  socket: any;

  constructor() {
    this.socket = io('http://localhost:8080/');
    this.socket.on('connect', isConnected => {
      console.log('connect');
    });
  }

  login(userName: string): Observable<boolean> {
    const observable = new Observable(observer => {
      this.socket.emit('adduser', userName, successful => {
        console.log('Replay recevied');
        return observer.next(successful);
      });
    });
    return observable;
  }
  getRoomList(): Observable<string[]> {
    const obs = new Observable( observer => {
      this.socket.emit('rooms');
      this.socket.on('roomlist', (lst) => {
        const strArr: string[] = [];
        for (const x in lst) {
          if (x !== null && x !== 'undefined') {
            strArr.push(x);
          }
        }
        observer.next(strArr);
      });
    });
    return obs;
  }

  addRoom(roomName : string) : Observable<boolean>{
    const observable = new Observable(observer => {
      var param = {
        room: roomName,
        pass: null
      };
      this.socket.emit("joinroom", param, function(a : boolean, b){
        observer.next(a);
      });
    });
    return observable;
  }
}
