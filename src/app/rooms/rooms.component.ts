import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  roomId : string;

  room: string = 'strengur';

  constructor(private router : Router,
              private route : ActivatedRoute) {

  }
  ngOnInit() {
    this.roomId = this.route.snapshot.params['id'];
  }

}
