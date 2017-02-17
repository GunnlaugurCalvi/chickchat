import { RoomsComponent } from './rooms/rooms.component';
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
      this.socket.emit('adduser', userName, function(successful) {
        observer.next(successful);
      });
    });
    return observable;
  }

  joinRoom(roomName: string): Observable<boolean> {
    const observable = new Observable(observer => {
      this.socket.emit('joinroom', {room: roomName, pass: null}, function(successful) {
        observer.next(successful);
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
      this.socket.emit('joinroom', {room: roomName, pass: null});
    });
    return observable;
  }

  sendMessage(param): Observable<boolean> {
    const observable = new Observable(observer => {
      this.socket.emit('sendmsg', param, (successful) => {
        if (successful) {
          console.log('WOW WE JOINED!');
        } else {
          console.log('ERROR: COULDN\'T SEND MESSAGE');
        }
      });
    });
    return observable;
  }

  getMessages(_room): Observable<string[]> {
    const obs = new Observable( observer => {
      this.socket.on('updatechat', (room, msg) => {
        if (_room === room) {
          observer.next(msg);
        }
      });
    });
    return obs;
  }

  getUsers(_room): Observable<string[]> {
    const obs = new Observable( observer => {
      this.socket.on('updateusers', (room, users, ops) => {
        if (_room === room) {
          observer.next({room: room, users: users, ops: ops});
        }
      });
    });
    return obs;
  }
}
