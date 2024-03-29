import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ChatService } from './chat.service';
import { RouterModule} from '@angular/router';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RoomListComponent,
    RoomsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ToastModule.forRoot(),
    RouterModule.forRoot([{
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
    }, {
      path: 'login',
      component: LoginComponent
    }, {
      path: 'roomlist',
      component: RoomListComponent
    }, {
      path: 'room/:id',
      component: RoomsComponent
    }, {
      path: '**',
      redirectTo: '/login'
    }])
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
