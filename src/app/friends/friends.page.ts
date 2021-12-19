import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {
  friends = [];
  constructor(
    private userService: UserService) { }

  ngOnInit() {
    this.userService.getFriends().subscribe((friends) => {
      this.friends = friends;
    });
  }
  deleteConversation(){
    console.log('Deleting');
  }

}
