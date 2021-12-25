import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../models/User';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss'],
})
export class FriendComponent implements OnInit {
  @Input() friend!: User;
  constructor(private nav: NavController) { }

  ngOnInit() {}
  seeMessages() {
    this.nav.navigateForward('/messages', { state: this.friend });
  }
  deleteConversation(){
    console.log('Conversation deleted');
  }
}
