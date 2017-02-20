import { AfterViewChecked } from '@angular/core/src/metadata/lifecycle_hooks';
import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { ChatService } from '../chat.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})

export class RoomsComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatbox') chatboxContainer: ElementRef;

  public messageForm = this.fb.group({
    message: ['', Validators.required],
  });
  messages: Object[];
  users: string[];
  ops: Object[];
  roomId: string;
  // tslint:disable-next-line:no-inferrable-types
  userIsOp: boolean = false;
  currUser: string;

  constructor(private router: Router, private chatService: ChatService, private route: ActivatedRoute, public fb: FormBuilder,
              public toastr: ToastsManager, vcr: ViewContainerRef) {
              this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.roomId = this.route.snapshot.params['id'];

    this.chatService.getMessages(this.roomId).subscribe(lst => {
      this.messages = lst;
    });
    this.chatService.getUsers(this.roomId).subscribe((usr: any) => {
      this.users = usr.usrArr;
      this.ops = usr.opArr;
      this.currUser = this.chatService.currUser;
      console.log(this.currUser);
      for (const name in this.ops) {
        if (this.currUser === this.ops[name]) {
          this.userIsOp = true;
        }
      }
    });
    this.chatService.kicked().subscribe((kUser: string) => {
      if (this.currUser === kUser) {
        this.router.navigate(['/roomlist']);
      }
    });
    this.chatService.banned().subscribe((bUser: string) => {
      if (this.currUser === bUser) {
        this.router.navigate(['/roomlist']);
      }
    });
  }

  ngAfterViewChecked() {
    this.chatboxContainer.nativeElement.scrollTop = this.chatboxContainer.nativeElement.scrollHeight;
  }

  sendMsg() {
    this.chatService.sendMessage({roomName: this.roomId, msg: this.messageForm.value.message});
    this.messageForm.reset();
  }
  partRoom() {
    this.chatService.partRoom(this.roomId);
    this.router.navigate(['/roomlist']);
  }

  kickUser(kUser: string) {
    this.chatService.kickUserFromParty(this.roomId, kUser).subscribe(successful => {
      if (successful) {
        this.toastr.info(kUser + ' was kicked', 'info', {dismiss: 'auto'});
      }
    });
  }
  banUser(bUser: string) {
    this.chatService.banUserFromParty(this.roomId, bUser).subscribe(successful => {
      if (successful) {
        this.toastr.info(bUser + ' was banned', 'info', {dismiss: 'auto'});
      }
    });
  }

}
