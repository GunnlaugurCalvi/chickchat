import { RoomsComponent } from './rooms/rooms.component';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class ChatService {

  socket: any;
  currUser: string;
  isKicked: boolean;
  isBanned: boolean;

  constructor() {
    this.socket = io('http://localhost:8080/');
    this.socket.on('connect', isConnected => {
      console.log('Connected');
    });
  }

  login(userName: string): Observable<boolean> {
    this.currUser = userName;
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
      this.socket.emit('joinroom', {room: roomName, pass: null}, function (successful) {
        observer.next(successful);
      });
    });
    return observable;
  }

  sendMessage(param: Object) {
    this.socket.emit('sendmsg', param);
  }

  getMessages(_room: string): Observable<string[]> {
    const obs = new Observable( observer => {
      this.socket.on('updatechat', (room, msg) => {
        if (_room === room) {
          observer.next(msg);
        }
      });
    });
    return obs;
  }

  getUsers(_room: string): Observable<string[]> {
    const obs = new Observable( observer => {
      this.socket.on('updateusers', (room, users, ops) => {
        if (_room === room) {
          const usrArr: string[] = [];
          const opArr: string[] = [];
          for (const x in users) {
            if (x !== null) {
              usrArr.push(x);
            }
          }
          for (const x in ops) {
            if (x !== null) {
              opArr.push(x);
            }
          }
          observer.next({usrArr, opArr});
        }
      });
    });
    return obs;
  }
  partRoom(_room: string) {
    console.log('parting room: ' + _room);
    this.socket.emit('partroom', _room);
  }

  kickUserFromParty(_room: string, _user: string): Observable<boolean> {
    const observerable = new Observable(observer => {
      this.socket.emit('kick', {room: _room, user: _user}, (successful) => {
        if (successful) {
          console.log('kicked user: ' + _user + ' out of room: ' + _room);
        }
        observer.next(successful);
      });
    });
    return observerable;
  }
  banUserFromParty(_room: string, _user: string): Observable<boolean> {
    const observable = new Observable(observer => {
      this.socket.emit('ban', {room: _room, user: _user}, (successful) => {
        if (successful) {
          console.log('banned user: ' + _user + ' from this room: ' + _room);
        }
        observer.next(successful);
      });
    });
    return observable;
  }
  kicked(): Observable<string> {
    const observable = new Observable(observer => {
      this.socket.on('kicked', (param1, param2) => {
        console.log(param2);
        this.isKicked = true;
        observer.next(param2);
      });
    });
    return observable;
  }
  banned(): Observable<string> {
    const observable = new Observable(observer => {
      this.socket.on('banned', (param1, param2) => {
        console.log(param2);
        this.isBanned = true;
        observer.next(param2);
      });
    });
    return observable;
  }
  disconnect() {
    console.log(this.currUser + ' has disconnected');
    this.socket.emit('disconnect');
  }
}
