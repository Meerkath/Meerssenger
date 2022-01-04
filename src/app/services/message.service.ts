/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../models/Message';
import { User } from '../models/User';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'http://localhost:3000/messages';
  constructor(private http: HttpClient) { }

  getLastMessage(friend: User): Observable<Message> {
    return this.http.get<Message>(`${this.apiUrl}/lastMessage/${friend._id}`);
  }

  getAllMessages(friend: User): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/allMessages/${friend._id}`);
  }

  setMessages(friend: User, messages: Message[]) {
    const stringMessages = JSON.stringify(messages);
    return Storage.set({key:`messagesWith${friend.userName}`, value:stringMessages});
  }

  async getMessages(friend: User): Promise<Message[]> {
    const stringMessage = (await Storage.get({key:`messagesWith${friend.userName}`})).value;
    return JSON.parse(stringMessage);
  }

  sendMessage(message: Message, recipient: User): Observable<Message>{
    return this.http.post<Message>(`${this.http.apiUrl}/sendMessage`); //TODO
  }
}
