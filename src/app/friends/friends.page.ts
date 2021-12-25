/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Message } from '../models/message';
import { MessageService } from '../services/message.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {
  friends: User[] = [];
  constructor(
    private userService: UserService,
    private navController: NavController,
    private messageService: MessageService,
    private router: Router
    ) { }

  ngOnInit() {
    this.userService.getFriends().subscribe(
    {
      next: (friends: User[]) => {
        friends.forEach((friend: User) => {
          this.messageService.getLastMessage(friend._id).subscribe((message: Message) => {
            friend.lastMessage = message;
          });
        });
        this.friends = friends;
      },
      error: () => {
        this.router.navigate(['/login']);
      }
    });
  }
  deleteConversation(){
    console.log('Deleting');
  }
}
