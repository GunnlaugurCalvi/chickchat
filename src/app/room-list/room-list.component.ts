import {Component, OnInit} from '@angular/core';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
  rooms: string[];
  newRoomName: string;
  created: boolean = false;
  constructor(private chatService: ChatService, private router: Router) { }

  ngOnInit() {
    this.chatService.getRoomList().subscribe(lst => {
      this.rooms = lst;
      console.log(this.rooms);
    });
  }
  newRoom() {
    if (this.newRoomName) {
      this.chatService.addRoom(this.newRoomName).subscribe(successful => {
        if (successful) {
          console.log('Adding a room: ' + this.newRoomName);
          this.router.navigate(['/room', this.newRoomName]);
        } else {
          console.log('ERROR: Couldn\'t add a room');
        }
      });
    }
  }
  joinRoom(room) {
    this.chatService.joinRoom(room).subscribe(successful => {
      if (successful) {
        console.log('Joining room: ' + room);
      } else {
        console.log('ERROR: Couldn\'t join ' + room);
      }
    });
    this.router.navigate(['/room/' + room]);
  }
}
