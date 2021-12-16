import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {
  friends = [];
  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.authService.getAccessToken()
    .then((accessToken) => {
      this.userService.getFriends(accessToken.value)
      .subscribe((friends) => {
        this.friends = friends;
      });
    });
  }

  deleteConversation(){
    console.log('Deleting');
  }

}
