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
  newRoomName: string;
  constructor(private chatService: ChatService, private router: Router) { }

  ngOnInit() {
    this.chatService.getRoomList().subscribe(lst => {
      this.rooms = lst;
      console.log(this.rooms);
    });
  }
  onNewRoom(){
    if(this.newRoomName.length < 1){
      console.log('no room name entered');
      alert('pleasse enter a name for room');
      return;
    }
    this.chatService.addRoom(this.newRoomName).subscribe(successful => {
      if (successful) {
        console.log('Adding a room: ' + this.newRoomName);
        alert('Adding a room: ' + this.newRoomName);
      } else {
        console.log('no game');
      }
      if(successful === true){
        this.router.navigate(["/room", this.newRoomName])
      }
    });
  }
}
