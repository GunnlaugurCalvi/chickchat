import { Component, OnInit } from '@angular/core';
import {} from '../chat.service';
import {ChatService} from '../chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName: string;
  // tslint:disable-next-line:no-inferrable-types
  loginFailed: boolean = false;

  constructor(private chatService: ChatService, private router: Router) { }

  ngOnInit() {
  }

  onLogin() {
    console.log('Login called in component. Username: ' + this.userName);
    if (this.userName.length <= 0) {
      return;
    }
    this.chatService.login(this.userName).subscribe(isSuccess => {
      if (this.loginFailed === !isSuccess) {
        console.log('successfully added');
      } else {
        console.log('same name no game');
      }
      if (isSuccess === true) {
        this.router.navigate(['/roomlist']);
      // TODO REDIRECT TO ROOM-LIST COMPONENT
      }
    });

  }

}
