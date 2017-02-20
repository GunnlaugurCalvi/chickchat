import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
  rooms: string[];
  isKicked: boolean;
  isBanned: boolean;
  public newRoomForm = this.fb.group({
    newRoom: ['', Validators.required],
  });
  constructor(private chatService: ChatService, private router: Router, public fb: FormBuilder,
              public toastr: ToastsManager, vcr: ViewContainerRef) {

    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.chatService.getRoomList().subscribe(lst => {
      this.rooms = lst;
      console.log(this.rooms);
    });
    this.isKicked = this.chatService.isKicked;
    if (this.isKicked === true) {
      this.toastr.warning('OP kicked you from this room', 'Warning', {dismiss: 'auto'});
    }
    this.isBanned = this.chatService.isBanned;
    if (this.isBanned === true) {
      this.toastr.warning('OP banned you from this room and you are not allowd back in!!', 'Warning', {dismiss: 'auto'});
    }
  }
  newRoom() {
    if (this.newRoom) {
      this.chatService.addRoom(this.newRoomForm.value.newRoom).subscribe(successful => {
        if (successful) {
          console.log('Adding a room: ' + this.newRoomForm.value.newRoom);
          this.router.navigate(['/room', this.newRoomForm.value.newRoom]);
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
        this.router.navigate(['/room/' + room]);
      } else {
        console.log('ERROR: Couldn\'t join ' + room);
      }
    });
  }
  disconnect() {
    this.chatService.disconnect();
    this.router.navigate(['/login']);
  }
}
