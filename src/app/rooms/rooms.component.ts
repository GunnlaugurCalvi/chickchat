import { AfterViewChecked } from '@angular/core/src/metadata/lifecycle_hooks';
import { elementAt } from '@angular-cli/ast-tools/node_modules/rxjs/operator/elementAt';
import { ElementFinder } from 'protractor/built/element';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../chat.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
  roomId: string;

  constructor(private router: Router, private chatService: ChatService, private route: ActivatedRoute, public fb: FormBuilder) {}

  ngOnInit() {
    this.roomId = this.route.snapshot.params['id'];
    console.log(this.roomId);
    this.chatService.getMessages(this.roomId).subscribe(lst => {
      console.log(lst);
      this.messages = lst;
    });
  }
  ngAfterViewChecked() {
    this.chatboxContainer.nativeElement.scrollTop = this.chatboxContainer.nativeElement.scrollHeight + 42;
  }

  sendMsg() {
    this.chatService.sendMessage({roomName: this.roomId, msg: this.messageForm.value.message}).subscribe(successful => { });
    this.messageForm.reset();
  }
}
