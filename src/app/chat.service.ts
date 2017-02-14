import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class ChatService {

  socket: any;

  constructor() {
    this.socket = io('http://localhost:8080/');
    this.socket.on('connect', isConnected => {
      console.log('Connected');
    });
  }

  login(userName: string): Observable<boolean> {
    const observable = new Observable(observer => {
      this.socket.emit('adduser', userName, successful => {
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
          if (x !== null) {
            strArr.push(x);
          }
        }
        observer.next(strArr);
      });
    });
    return obs;
  }

  addRoom(roomName: string): Observable<boolean> {
    const observable = new Observable(observer => {
      this.socket.emit('joinroom', {room: roomName, pass: null}, function(a: boolean, b){
        observer.next(a);
      });
    });
    return observable;
  }
  joinRoom(roomName: string): Observable<boolean> {
    const observable = new Observable(observer => {
      this.socket.emit('joinroom', {room: roomName, pass: null} , successful => {
        return observer.next(successful);
      });
    });
    return observable;
  }
}
