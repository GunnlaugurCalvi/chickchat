import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {} from '../chat.service';
import {ChatService} from '../chat.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm = this.fb.group({
    userName: ['', Validators.required],
  });

  constructor(private chatService: ChatService, private router: Router, public toastr: ToastsManager, 
              private vcr: ViewContainerRef, public fb: FormBuilder) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }


  onLogin() {
    console.log('Login called in component. Username: ' + this.loginForm.value.userName);
    if (this.loginForm.value.userName.length <= 0) {
      this.toastr.error('Must enter a name', 'Error');
      return;
    }
    this.chatService.login(this.loginForm.value.userName).subscribe(isSuccess => {
      if (isSuccess) {
        console.log('successfully logged user in');
        this.router.navigate(['/roomlist']);
      } else {
        this.toastr.error('Name Already Taken', 'Error!', {dismiss: 'auto'});
        console.log('ERROR: Couldn\'t log user in');
      }
    });
  }
}
