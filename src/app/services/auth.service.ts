import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Storage } from '@capacitor/storage';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  refreshToken(token: string): Observable<any> {
    const headers = new HttpHeaders(
      {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
      }
    );
    return this.http.get(`${this.apiUrl}/refreshToken`, {headers});
  }

  async saveTokenLocally(token: string){
    await Storage.set({key:'accessToken', value:token});
  }
}
