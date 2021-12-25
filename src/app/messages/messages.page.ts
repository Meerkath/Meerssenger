import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  friend: any; // Weird bug of typescript can't set User and set it passing with getCurrentNavigation
  constructor(private router: Router) { }

  ngOnInit() {
    const friend = this.router.getCurrentNavigation().extras.state;
    if(!friend){
      this.router.navigate(['friends']);
    }
    this.friend = friend;
    //TODO get and display messages
  }
}
