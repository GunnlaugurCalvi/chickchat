import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ChatService } from './chat.service';
import { RouterModule} from '@angular/router';


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
    HttpModule,
    RouterModule.forRoot([{
      path: "",
      redirectTo: "login",
      pathMatch: "full"
    }, {
      path: "login",
      component: LoginComponent
    },{
      path: "rooms",
      component: RoomListComponent
    }])
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
