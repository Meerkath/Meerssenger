import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  refreshToken(token: string): Observable<any> {
    const headers = new HttpHeaders(
      {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
      }
    );
    return this.http.get(`${this.apiUrl}/refreshToken`, {headers});
  }
}
