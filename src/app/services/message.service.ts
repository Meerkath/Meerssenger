import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../models/Message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'http://localhost:3000/messages';
  constructor(private http: HttpClient) { }

  getLastMessage(userId: string): Observable<any> {
    return this.http.get<Message>(`${this.apiUrl}/lastMessage/${userId}`);
  }
}
