import { AfterViewChecked } from '@angular/core/src/metadata/lifecycle_hooks';
import { elementAt } from '@angular-cli/ast-tools/node_modules/rxjs/operator/elementAt';
import { ElementFinder } from 'protractor/built/element';
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
      for(var name in this.ops){
        if(this.currUser === this.ops[name]){
          this.userIsOp = true;
        }
      }

    });
  }
  ngAfterViewChecked() {
    this.chatboxContainer.nativeElement.scrollTop = this.chatboxContainer.nativeElement.scrollHeight;
  }

  sendMsg() {
    this.chatService.sendMessage({roomName: this.roomId, msg: this.messageForm.value.message}).subscribe(successful => { });
    this.messageForm.reset();
  }
  partRoom() {
    this.chatService.partRoom(this.roomId);
    this.router.navigate(['/roomlist']);
  }

  kickUser(kUser) {
    this.chatService.kickUserFromParty(this.roomId, kUser).subscribe(successful => {
      if(successful){
        this.toastr.info(kUser + ' was kick', 'info', {dismiss: 'auto'});

      }
    });
  }
  banUser(bUser){
    this.chatService.banUserFromParty(this.roomId, bUser);
  }
}
