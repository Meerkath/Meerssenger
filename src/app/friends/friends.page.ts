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
    private userService: UserService,
    private router: Router,
    ) { }

  ngOnInit() {
    // this.storageService.get('accessToken')
    // .then((accessToken) => {
    //   if (!accessToken) {
    //     this.router.navigate(['/friends']);
    //   }
    //   this.userService.getFriends(accessToken).subscribe((friends) => {
    //     console.log(friends); //TODO if 401 refreshToken
    //   });
    // });
  }

  deleteConversation(){
    console.log('Deleting');
  }

}
