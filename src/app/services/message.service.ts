/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../models/Message';
import { User } from '../models/User';
import { Storage } from '@capacitor/storage';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = `http://${ environment.serverIp }:${ environment.port }/messages`;
  constructor(private http: HttpClient) { }

  async getLastMessage(friend: User): Promise<Message> {
    const message = await this.http.get<any>(`${this.apiUrl}/lastMessage/${ friend._id }`).toPromise();
    return message;
  }

  getAllMessages(friend: User): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/allMessages/${ friend._id }`);
  }

  sendMessage(message: Message, recipient: User): Observable<Message>{
    return this.http.post<Message>(`${this.apiUrl}/send/${recipient._id}`,{ message });
  }

  setMessages(friend: User, messages: Message[]) {
    const stringMessages = JSON.stringify(messages);
    return Storage.set({key:`messagesWith${friend.userName}`, value: stringMessages});
  }

  async getMessages(friend: User): Promise<Message[]> {
    const stringMessage = (await Storage.get({key:`messagesWith${ friend.userName }`})).value;
    return JSON.parse(stringMessage);
  }
}
