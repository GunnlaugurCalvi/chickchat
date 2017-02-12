import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
  rooms: string[];

  constructor(private chatService: ChatService, private router: Router) { }

  ngOnInit() {
    this.chatService.getRoomList().subscribe(lst => {
      this.rooms = lst;
      console.log(this.rooms);
    });
  }

  joinRoom(room) {
    this.chatService.joinRoom(room).subscribe(isSuccess => {
      if (isSuccess) {
        console.log('Joining a room: ' + room);
        alert('Joining a room: ' + room);
      } else {
        console.log('no game');
      }
      if (isSuccess === true) {
        this.router.navigate(['/room']);
      // TODO REDIRECT TO ROOM COMPONENT
      }
    });
  }
}
