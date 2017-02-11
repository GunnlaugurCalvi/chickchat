import { Component, OnInit } from '@angular/core';
import {} from '../chat.service';
import {ChatService} from "../chat.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName : string;
  loginFailed : boolean = false;

  constructor(private chatService : ChatService,
              private  router : Router) {
  }

  ngOnInit() {
  }

  onLogin(){
    console.log("Login called in component");
    this.chatService.login(this.userName).subscribe(isSuccess =>{
      if(this.loginFailed === !isSuccess) {
        console.log("succesfully added");
        alert(this.userName + " has beeen added");
      }
      else{
        console.log("same name no game");
        alert(this.userName + " naaaaa be creative");
        }
      if (isSuccess === true){
        this.router.navigate(['/rooms']);
      // TODO REDIRECT TO ROOM-LIST COMPONENT
      }
    });

  }

}
