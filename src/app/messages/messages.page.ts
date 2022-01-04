/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { MessageService } from '../services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from '../models/Message';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  friend: User;
  messages: Message[];
  input: string;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
    ) { }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async data => {
      if(!data){
        this.router.navigate(['/login']);
      }
      this.friend = {
        _id: data._id,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        userName: data.userName
      };
      this.messages = await this.messageService.getMessages(this.friend);
      this.messageService.getAllMessages(this.friend).subscribe(
      {
        next: (messages: Message[]) => {
          messages.forEach(message => {
            if (message.senderId === this.friend._id){
              message.sentByActualUser = false;
            }
            else {
              message.sentByActualUser = true;
            }
          });
          messages = messages.sort((a, b) => {
              if(a.date > b.date){
                return 1;
              }
              return -1;
          });
          if(this.messages !== messages) {
            this.messageService.setMessages(this.friend, messages);
            this.messages = messages;
          }
        },
        error: () => {
          this.router.navigate(['/login']);
        }
      });
    });
  }

  sendMessage(){
    if(!this.input) {return;}
    
  }
}
