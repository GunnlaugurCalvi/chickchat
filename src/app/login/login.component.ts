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
      if (isSuccess) {
        console.log('successfully logged user in');
        this.router.navigate(['/roomlist']);
      } else {
        console.log('ERROR: Couldn\'t log user in');
      }
    });

  }

}
