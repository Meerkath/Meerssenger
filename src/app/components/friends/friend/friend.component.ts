import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../models/User';
import { Router } from '@angular/router';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss'],
})
export class FriendComponent implements OnInit {
  @Input() friend!: User;
  constructor(
    private router: Router,
    public dateService: DateService,
    ) { }

  ngOnInit() {
    this.seeMessages();
  }
  seeMessages() {
    this.router.navigate(['/messages', this.friend]);
  }
  deleteConversation(){
    console.log('Conversation deleted');
  }
}
