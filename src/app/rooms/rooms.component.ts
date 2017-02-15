import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  roomId: string;
  message: string;

  constructor(private router: Router, private chatService: ChatService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.roomId = this.route.snapshot.params['id'];
    console.log(this.roomId);
  }
  sendMsg() {
    this.chatService.sendMessage({roomName: this.roomId, msg: this.message}).subscribe(successful => {
      console.log('Message sending: ' + this.message);
      if (successful) {
        console.log('Message sent: ' + this.message);
      } else {
        console.log('ERROR: Couldn\'t add a room');
      }
    });
  }
}
