/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { MessageService } from '../services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from '../models/Message';
import { DateService } from '../services/date.service';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  friend: User;
  messages: Message[];
  message: string;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private dateService: DateService
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
          messages = this.sortMessages(messages);
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
    if(!this.message) {return;}
    const messageToSend: Message = {
      content: this.message,
      date: new Date(Date.now())
    };
    this.message = '';
    this.messageService.sendMessage(messageToSend, this.friend).subscribe((sentMessage: Message) => {
      sentMessage.sentByActualUser = true;
      sentMessage.read = true;
      this.messages.push(sentMessage);
    });
  }

  sortMessages(messages: Message[]) {
    return messages.sort((a, b) => {
      if(a.date > b.date){
        return 1;
      }
      return -1;
  });
  }
}
