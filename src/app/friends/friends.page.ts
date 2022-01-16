/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { MessageService } from '../services/message.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {
  friends: User[] = [];
  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private router: Router,
    private authService: AuthService,
    ) { }

  async ngOnInit() {
    this.refreshFriends();
  }

  async refreshFriends() {
    this.userService.getFriends().subscribe(
    {
      next: async (friends: User[]) => {
        for (const friend of friends) {
          friend.lastMessage = await this.messageService.getLastMessage(friend);
        }
        if(JSON.stringify(friends) !== JSON.stringify(this.friends)){
          this.friends = friends;
        }
      },
      error: async () => {
        await this.authService.deleteAccessToken();
        this.router.navigate(['/login']);
      }
    });
    setTimeout(() => {
      this.refreshFriends();
    }, 1000);
  }
  deleteConversation(){
    console.log('Deleting');
  }
}
