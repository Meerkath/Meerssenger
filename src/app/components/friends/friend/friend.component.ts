import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../models/User';
@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss'],
})
export class FriendComponent implements OnInit {
  @Input() friend!: User;
  lastMessage: string;
  constructor() { }

  ngOnInit() {}
  deleteConversation(){
    console.log('Conversation deleted');
  }
}
